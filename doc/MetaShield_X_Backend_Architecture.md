# MetaShield-X: Backend API & Server Layer

This document specifically covers the architecture, networking, and server infrastructure of the "Intelligence Engine"—the backend layer of MetaShield-X.

## 1. Directory Structure & Technologies

**Location**: `backend/`
**Core Technologies**:
- **Python 3.10+**: The language of the server.
- **FastAPI**: A high-performance asynchronous web framework.
- **Uvicorn**: An ASGI server to run the FastAPI application.

## 2. Why FastAPI over Django/Flask?

In cybersecurity, network telemetry is generated at an astronomical rate. If a server blocks the main thread while processing a single network packet, it will bottleneck and crash during a DDoS attack.

**The Solution:**
We chose **FastAPI** because it is built on Starlette and is natively asynchronous (`async def`). When the frontend sends a `POST` request to classify an event, FastAPI can receive thousands of concurrent requests simultaneously. It passes them to the Machine Learning modules, and because those ML modules are written in hyper-fast pure Python math, the server can return JSON responses in fractions of a millisecond without ever blocking the event loop.

## 3. Server Architecture (`server.py`)

The main entry point for the backend is `server.py`. 

### Initialization
When the server boots, it initializes the three core ML modules as persistent objects in memory:
1. `bayesian_engine = BayesianFewShotEngine()`
2. `novelty_detector = NoveltyDetector()`
3. `drift_monitor = DriftMonitor()`

### The API Endpoint (`POST /api/v1/events`)
This is the single route that the frontend communicates with. 
1. **Ingestion**: It accepts a JSON payload representing a network event (e.g., Source IP, Protocol).
2. **Analysis Pipeline**:
   - The payload is immediately fed into the `novelty_detector`. The detector calculates its entropy. If it's chaotic, it flags it.
   - The payload is then fed into the `bayesian_engine` to be classified against known threat prototypes.
   - Finally, the event's statistics are logged by the `drift_monitor` to track long-term baseline shifts.
3. **Response**: The server constructs a comprehensive JSON response containing the `predicted_class`, `confidence` score, and `risk_score` (LOW, MEDIUM, HIGH, CRITICAL) and returns it to the frontend via an HTTP 201 Created status.

## 4. Zero Dependencies

A critical architectural decision was to build the backend with **zero reliance on C++ bound database drivers** (like `psycopg2`) or heavy ORMs (like SQLAlchemy). 
By keeping the server entirely memory-based and utilizing purely native Python data structures, the server is 100% portable. It can be cloned and booted on Windows, Linux, or MacOS in under a second without requiring the user to install complex C-compilers or Microsoft Visual Studio Build Tools.
