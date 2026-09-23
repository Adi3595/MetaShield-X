# MetaShield-X: Database & State Architecture

This document outlines the approach taken for data storage, persistence, and state management within the MetaShield-X platform.

## 1. The Core Philosophy: Stateless Inference

In a traditional enterprise application, an incoming network request would be parsed, saved to a relational database (like PostgreSQL or MySQL), and then queried for analysis. 

**MetaShield-X fundamentally rejects this paradigm for its intelligence engine.**

### Why We Avoided Traditional Relational Databases (SQL)
1. **Dependency Hell**: Installing heavy C++ bound database drivers (like `psycopg2` for PostgreSQL) is a notorious point of failure on Windows and Edge environments. 
2. **I/O Bottlenecks**: Writing thousands of telemetry logs to a hard drive (disk I/O) every second creates a massive bottleneck. During a DDoS attack, the database connection pool would exhaust, crashing the entire system.
3. **SQL Injection Vulnerabilities**: By removing the SQL database from the real-time ingestion pipeline, it is mathematically impossible to execute a SQL Injection attack on the live telemetry stream.

---

## 2. The In-Memory Intelligence State

Instead of a disk-based database, MetaShield-X utilizes a highly optimized **In-Memory State** managed entirely by the pure native Python backend.

### How State is Maintained
When the FastAPI server boots (`server.py`), it initializes the Machine Learning engines as persistent objects in RAM:
```python
bayesian_engine = BayesianFewShotEngine()
novelty_detector = NoveltyDetector()
drift_monitor = DriftMonitor()
```

As network logs arrive via `POST /api/v1/events`, these objects update their internal state variables (like the entropy threshold, historical variance matrices, and probability distributions) dynamically in memory. 

### The Benefit: Lightning Speed
Because the data never touches a hard drive and never waits for an ORM (Object Relational Mapper) query, the system can classify a threat and adapt its prototypes in fractions of a millisecond.

---

## 3. Frontend State Management

On the frontend (`frontend/src/app/dashboard/page.tsx`), the dashboard does not query a backend database to load historical data. It acts as a live, ephemeral ledger.

### React `useState` & Memory Management
The frontend utilizes a React `useState` array to maintain the live telemetry stream.
```tsx
const [stream, setStream] = useState<ThreatEvent[]>([]);
```
To prevent memory leaks and browser crashes (since network events arrive continuously), the frontend enforces strict slice limits, ensuring only the most recent critical events are kept in the DOM at any given time.

---

## 4. Future Expansion: Cold Storage Archiving

If long-term persistence is required for auditing or compliance purposes in the future, the architecture is designed to support **Cold Storage Archiving**. 
The telemetry data can be piped asynchronously into a NoSQL document store (like MongoDB or Elasticsearch) or a simple Time-Series database (like InfluxDB) purely for read-only historical analysis, keeping the primary inference pipeline 100% stateless and in-memory.
