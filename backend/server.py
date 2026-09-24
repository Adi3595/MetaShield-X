import http.server
import socketserver
import json
import time
import math
from datetime import datetime

# Import our native Python ML Engines
from app.ml.bayesian import BayesianFewShotEngine
from app.ml.novelty import NoveltyDetector

PORT = 8000

# Initialize the ML layer
bayesian_engine = BayesianFewShotEngine(embedding_dim=64, num_classes=10)
novelty_detector = NoveltyDetector(threshold=0.7)

# In-memory store for the live demo
EVENT_STORE = []

class MetaShieldAPIHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
        self.end_headers()
        
    def do_GET(self):
        if self.path == '/api/v1/events':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(EVENT_STORE).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
        
    def do_POST(self):
        if self.path == '/api/v1/events':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            event_data = json.loads(post_data.decode('utf-8'))
            
            # 1. Feature extraction placeholder (in a real system this transforms telemetry to vector)
            
            import hashlib
            raw_string = f"{event_data.get('source_ip', '')}:{event_data.get('destination_ip', '')}:{event_data.get('protocol', '')}:{event_data.get('bytes_transferred', '')}:{event_data.get('packet_count', '')}"
            hash_digest = hashlib.sha256(raw_string.encode()).digest()
            features = [float(b) / 255.0 * 10.0 - 5.0 for b in hash_digest]
            features = (features * 2)[:64]
 
            
            # 2. Bayesian prediction
            pred_idx, max_prob, min_dist = bayesian_engine.forward(features)
            predicted_class = bayesian_engine.get_class_name(pred_idx)
            
            # 3. Novelty Detection (Using Bayesian probability entropy)
            entropy = -math.log(max_prob + 1e-8) if max_prob > 0 else 10.0
            # For demo variation, we'll derive min_dist from the probability
            # min_dist calculated by bayesian engine 
            
            novelty_score = novelty_detector.compute_novelty_score(min_dist, entropy)
            is_novel = novelty_detector.is_novel(novelty_score)
            
            if is_novel:
                event_status = "UNKNOWN"
                predicted_class = None
                risk_score = "CRITICAL"
            else:
                event_status = "KNOWN"
                risk_score = "HIGH" if max_prob > 0.8 else "MEDIUM"
                
            # Construct the final intelligent response
            response = {
                "id": f"EVT_{int(time.time()*1000)}",
                "timestamp": event_data.get("timestamp", datetime.now().isoformat()),
                "source_ip": event_data.get("source_ip", "0.0.0.0"),
                "destination_ip": event_data.get("destination_ip", "0.0.0.0"),
                "predicted_class": predicted_class,
                "confidence": max_prob,
                "novelty_score": novelty_score,
                "risk_score": risk_score,
                "status": event_status
            }
            
            # Save to global store
            EVENT_STORE.insert(0, response)
            if len(EVENT_STORE) > 50:
                EVENT_STORE.pop()
            
            self.send_response(201)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MetaShieldAPIHandler) as httpd:
        print(f"MetaShield-X Native Intelligence Server active on port {PORT}")
        httpd.serve_forever()
