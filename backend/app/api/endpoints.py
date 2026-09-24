from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.schemas.schemas import SecurityEventCreate, SecurityEventResponse
from app.models.domain import SecurityEvent, EventStatus
from app.ml.bayesian import BayesianFewShotEngine
from app.ml.novelty import NoveltyDetector
import random
import time
import math

router = APIRouter()

# Instantiate ML components
bayesian_engine = BayesianFewShotEngine()
novelty_detector = NoveltyDetector(threshold=0.7)

@router.post("/events", response_model=SecurityEventResponse, status_code=status.HTTP_201_CREATED)
async def create_event(event: SecurityEventCreate, db: AsyncSession = Depends(get_db)):
    # 1. Feature extraction (skipped for demo, using placeholders)
    
    # 1. Feature extraction
    # Hashing the incoming telemetry to generate a pseudo-real 64-dim embedding
    import hashlib
    raw_string = f"{event.source_ip}:{event.destination_ip}:{event.protocol}:{event.bytes_transferred}:{event.packet_count}"
    hash_digest = hashlib.sha256(raw_string.encode()).digest()
    features = [float(b) / 255.0 * 10.0 - 5.0 for b in hash_digest]
    # pad to 64 if needed
    features = (features * 2)[:64]

    
    # 2. Bayesian prediction
    pred_idx, max_prob, min_dist = bayesian_engine.forward(features)
    predicted_class = bayesian_engine.get_class_name(pred_idx)
    
    # 3. Novelty Detection
    # Mocking minimum distance to prototypes for demo
    # min_dist calculated by bayesian engine
    entropy = -math.log(max_prob + 1e-8) if max_prob > 0 else 10.0
    
    novelty_score = novelty_detector.compute_novelty_score(min_dist, entropy)
    is_novel = novelty_detector.is_novel(novelty_score)
    
    if is_novel:
        event_status = EventStatus.UNKNOWN
        predicted_class = None
        risk_score = "CRITICAL"
    else:
        event_status = EventStatus.KNOWN
        risk_score = "HIGH" if max_prob > 0.8 else "MEDIUM"
        
    db_event = SecurityEvent(
        **event.model_dump(),
        predicted_class=predicted_class,
        confidence=max_prob,
        novelty_score=novelty_score,
        risk_score=risk_score,
        status=event_status
    )
    
    db.add(db_event)
    await db.commit()
    await db.refresh(db_event)
    return db_event

@router.get("/events", response_model=List[SecurityEventResponse])
async def get_events(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    # Simple query placeholder
    return []
