class ConceptDriftMonitor:
    """
    Monitors data distribution over time to detect concept drift.
    """
    def __init__(self, window_size: int = 1000):
        self.window_size = window_size
        self.events = []
        self.drift_score = 0.0

    def add_event(self, novelty_score: float):
        self.events.append(novelty_score)
        if len(self.events) > self.window_size:
            self.events.pop(0)
            
    def calculate_drift(self) -> float:
        if not self.events:
            return 0.0
        # Simple moving average to mock drift
        self.drift_score = sum(self.events) / len(self.events)
        return self.drift_score
