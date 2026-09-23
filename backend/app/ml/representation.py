import math

class UniversalSecurityRepresentation:
    """
    Standardizes arbitrary security events into fixed-length numeric vectors.
    """
    def __init__(self, target_dim: int = 64):
        self.target_dim = target_dim

    def encode(self, telemetry: dict) -> list:
        """
        Mock encoding for demo without ML frameworks.
        """
        return [0.0] * self.target_dim
