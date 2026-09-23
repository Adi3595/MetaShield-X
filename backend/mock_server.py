import http.server
import socketserver
import json
import random
import time
from datetime import datetime

PORT = 8000

class MockAPIHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
        self.end_headers()
        
    def do_POST(self):
        if self.path == '/api/v1/events':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Send response status code
            self.send_response(200)
            
            # Send headers
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            is_anomaly = random.random() > 0.4
            
            response = {
                "id": f"EVT_{int(time.time()*1000)}",
                "timestamp": datetime.now().isoformat(),
                "source_ip": f"192.168.1.{random.randint(1, 255)}",
                "destination_ip": "10.0.0.5",
                "predicted_class": "APT29_BEACON" if is_anomaly else "NORMAL",
                "confidence": random.uniform(0.7, 0.99) if is_anomaly else random.uniform(0.9, 0.99),
                "risk_score": "CRITICAL" if is_anomaly else "LOW",
                "status": "ANOMALY" if is_anomaly else "CLEAN"
            }
            
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MockAPIHandler) as httpd:
        print("Serving pure Python mock backend at port", PORT)
        httpd.serve_forever()
