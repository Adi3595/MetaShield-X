from pydantic import BaseModel
from typing import Optional, Any, Dict, List
from datetime import datetime
from app.models.domain import RoleEnum, EventStatus

# User Schemas
class UserBase(BaseModel):
    email: str
    role: RoleEnum = RoleEnum.VIEWER

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Security Event Schemas
class SecurityEventBase(BaseModel):
    timestamp: datetime
    source_ip: str
    destination_ip: str
    protocol: str
    duration: float = 0.0
    packet_count: int = 0
    byte_count: int = 0
    raw_metadata: Optional[Dict[str, Any]] = None

class SecurityEventCreate(SecurityEventBase):
    pass

class SecurityEventResponse(SecurityEventBase):
    id: int
    predicted_class: Optional[str] = None
    confidence: Optional[float] = None
    novelty_score: Optional[float] = None
    risk_score: Optional[str] = None
    status: Optional[EventStatus] = None
    
    class Config:
        from_attributes = True

# Authentication Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
