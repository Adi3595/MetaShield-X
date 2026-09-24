
import json
import random
import math
import os

CLASSES = [
    'DoS / Slowloris', 'DDoS / SYN Flood', 'Web / SQLi',
    'Web / XSS', 'Brute Force / SSH', 'Botnet / C&C',
    'Infiltration / Port Scan', 'Ransomware / File IO',
    'Data Exfil', 'APT / Beaconing'
]

NUM_FEATURES = 64
SAMPLES_PER_CLASS = 100

def generate_synthetic_dataset():
    dataset = []
    labels = []
    base_patterns = {}
    for cls in CLASSES:
        base_patterns[cls] = [random.uniform(-5.0, 5.0) for _ in range(NUM_FEATURES)]
        
    for cls in CLASSES:
        base = base_patterns[cls]
        for _ in range(SAMPLES_PER_CLASS):
            sample = [base[i] + random.gauss(0, 1.0) for i in range(NUM_FEATURES)]
            dataset.append(sample)
            labels.append(cls)
            
    return dataset, labels

def train_model(dataset, labels):
    class_stats = {}
    for cls in CLASSES:
        cls_samples = [dataset[i] for i in range(len(dataset)) if labels[i] == cls]
        centroid = []
        for f in range(NUM_FEATURES):
            feature_vals = [sample[f] for sample in cls_samples]
            centroid.append(sum(feature_vals) / len(feature_vals))
            
        variance = []
        for f in range(NUM_FEATURES):
            feature_vals = [sample[f] for sample in cls_samples]
            mean = centroid[f]
            var = sum((x - mean) ** 2 for x in feature_vals) / len(feature_vals)
            variance.append(var + 1e-5)
            
        class_stats[cls] = {'centroid': centroid, 'variance': variance}
    return class_stats

if __name__ == '__main__':
    print('Generating synthetic dataset...')
    X, y = generate_synthetic_dataset()
    print('Training Nearest Centroid model...')
    model_weights = train_model(X, y)
    
    output_path = os.path.join(os.path.dirname(__file__), 'model_weights.json')
    with open(output_path, 'w') as f:
        json.dump(model_weights, f)
    print(f'Model successfully trained and saved to {output_path}')
