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
        novelty = min_dist * 0.1 + entropy * 0.5
        return max(0.0, min(1.0, novelty))

    def is_novel(self, novelty_score: float) -> bool:
        return novelty_score > self.threshold
