import math

class NoveltyDetector:
    """
    Detects unknown, anomalous, or emerging threats based on distance 
    from known class prototypes and predictive entropy.
    """
    def __init__(self, threshold: float = 0.85):
        self.threshold = threshold

    def compute_novelty_score(self, min_dist: float, entropy: float) -> float:
        """
        Calculate a novelty score [0, 1].
        High score indicates an unknown/novel threat.
        """
        # Combine distance and entropy for a novelty score
        
        # Scale down distance for 64-dimensional space (typically 20-60)
        scaled_dist = min_dist / 64.0
        # Max entropy for 10 classes is ln(10) ~ 2.3
        scaled_entropy = min(entropy / 2.3, 1.0)
        novelty = (scaled_dist * 0.4) + (scaled_entropy * 0.6)

        return max(0.0, min(1.0, novelty))

    def is_novel(self, novelty_score: float) -> bool:
        return novelty_score > self.threshold
