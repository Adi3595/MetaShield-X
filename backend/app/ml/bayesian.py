
import math
import json
import os
from typing import Dict, Tuple, List

class BayesianFewShotEngine:
    '''
    Implements a real Nearest Centroid probabilistic classifier using pre-trained weights.
    '''
    def __init__(self, embedding_dim: int = 64, num_classes: int = 10):
        self.embedding_dim = embedding_dim
        self.num_classes = num_classes
        self.classes = [
            'DoS / Slowloris', 'DDoS / SYN Flood', 'Web / SQLi',
            'Web / XSS', 'Brute Force / SSH', 'Botnet / C&C',
            'Infiltration / Port Scan', 'Ransomware / File IO',
            'Data Exfil', 'APT / Beaconing'
        ]
        self.model_weights = {}
        self._load_weights()

    def _load_weights(self):
        weight_path = os.path.join(os.path.dirname(__file__), 'model_weights.json')
        if os.path.exists(weight_path):
            with open(weight_path, 'r') as f:
                self.model_weights = json.load(f)
        else:
            print('WARNING: model_weights.json not found! Please run train_model.py')

    def forward(self, embedding: List[float]) -> Tuple[int, float, float]:
        if not self.model_weights:
            return 0, 0.0, 1.0

        distances = []
        for cls in self.classes:
            stats = self.model_weights.get(cls)
            if not stats:
                distances.append(float('inf'))
                continue
                
            centroid = stats['centroid']
            variance = stats['variance']
            
            # Calculate Simplified Mahalanobis Distance (Euclidean weighted by inverse variance)
            dist = 0.0
            for i in range(self.embedding_dim):
                diff = embedding[i] - centroid[i]
                dist += (diff ** 2) / variance[i]
            
            distances.append(math.sqrt(dist))

        # Convert distances to probabilities using Softmax (inverted distance)
        # Small distance -> High probability
        max_dist = max([d for d in distances if d != float('inf')] + [1.0])
        logits = [max_dist - d for d in distances]
        
        # Softmax
        exp_logits = [math.exp(l) for l in logits]
        sum_exp = sum(exp_logits)
        probs = [e / sum_exp for e in exp_logits]
        
        max_prob = max(probs)
        pred_idx = probs.index(max_prob)
        
        min_dist = min([d for d in distances if d != float('inf')]) if distances else 1.0; return pred_idx, max_prob, min_dist

    def get_class_name(self, idx: int) -> str:
        if 0 <= idx < len(self.classes):
            return self.classes[idx]
        return 'UNKNOWN_CLASS'

    def adapt(self, support_embeddings, support_labels):
        pass
