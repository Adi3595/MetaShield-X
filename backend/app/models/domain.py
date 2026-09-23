from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, JSON, ForeignKey, Enum
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class RoleEnum(str, enum.Enum):
    ADMIN = "Admin"
    ANALYST = "Security Analyst"
    RESEARCHER = "Researcher"
    VIEWER = "Viewer"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.VIEWER)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class EventStatus(str, enum.Enum):
    KNOWN = "KNOWN"
    UNKNOWN = "UNKNOWN"
    ANOMALOUS = "ANOMALOUS"
    EMERGING = "EMERGING"
    BENIGN = "BENIGN"

class SecurityEvent(Base):
    __tablename__ = "security_events"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    source_ip = Column(String, index=True)
    destination_ip = Column(String, index=True)
    protocol = Column(String)
    
    # Telemetry
    duration = Column(Float, default=0.0)
    packet_count = Column(Integer, default=0)
    byte_count = Column(Integer, default=0)
    
    # ML Results
    predicted_class = Column(String)
    confidence = Column(Float)
    novelty_score = Column(Float)
    risk_score = Column(String) # HIGH, MEDIUM, LOW
    status = Column(Enum(EventStatus))
    
    raw_metadata = Column(JSON, nullable=True)

class AttackClass(Base):
    __tablename__ = "attack_classes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)
    prototype_mean = Column(JSON, nullable=True) # Probabilistic prototype mean
    prototype_variance = Column(JSON, nullable=True) # Probabilistic prototype variance
    support_samples_count = Column(Integer, default=0)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    action = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    details = Column(JSON, nullable=True)
