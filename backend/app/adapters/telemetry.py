from abc import ABC, abstractmethod
from typing import Dict, Any, List
from datetime import datetime

class TelemetryAdapter(ABC):
    """
    Base class for ingesting heterogeneous security telemetry and 
    converting it into the Universal Security Representation schema.
    """
    
    @abstractmethod
    def ingest(self, raw_data: Any) -> Dict[str, Any]:
        """Convert a raw event into a standard dictionary schema."""
        pass
        
    @abstractmethod
    def batch_ingest(self, raw_data_list: List[Any]) -> List[Dict[str, Any]]:
        pass

class CICIDSAdapter(TelemetryAdapter):
    """
    Adapter specifically designed to handle the CIC-IDS2017 dataset schema.
    """
    def ingest(self, raw_row: Dict[str, Any]) -> Dict[str, Any]:
        # Maps CSV columns to the universal representation
        return {
            "timestamp": datetime.now().isoformat(), # Ideally parsed from raw_row["Timestamp"]
            "source_ip": raw_row.get("Source IP", "0.0.0.0"),
            "destination_ip": raw_row.get("Destination IP", "0.0.0.0"),
            "protocol": str(raw_row.get("Protocol", "TCP")),
            "duration": float(raw_row.get("Flow Duration", 0.0)),
            "packet_count": int(raw_row.get("Total Fwd Packets", 0)) + int(raw_row.get("Total Backward Packets", 0)),
            "byte_count": int(raw_row.get("Total Length of Fwd Packets", 0)) + int(raw_row.get("Total Length of Bwd Packets", 0)),
            "raw_metadata": raw_row
        }
        
    def batch_ingest(self, raw_data_list: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return [self.ingest(row) for row in raw_data_list]

class GenericJSONAdapter(TelemetryAdapter):
    """
    Fallback adapter for generic JSON security events (e.g. SIEM alerts).
    """
    def ingest(self, raw_json: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "timestamp": raw_json.get("timestamp", datetime.now().isoformat()),
            "source_ip": raw_json.get("src_ip", raw_json.get("source", "0.0.0.0")),
            "destination_ip": raw_json.get("dest_ip", raw_json.get("destination", "0.0.0.0")),
            "protocol": raw_json.get("proto", "UNKNOWN"),
            "duration": float(raw_json.get("duration", 0.0)),
            "packet_count": int(raw_json.get("packets", 0)),
            "byte_count": int(raw_json.get("bytes", 0)),
            "raw_metadata": raw_json
        }
        
    def batch_ingest(self, raw_data_list: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return [self.ingest(row) for row in raw_data_list]
