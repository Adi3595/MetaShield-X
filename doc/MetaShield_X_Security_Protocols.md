# MetaShield-X: Security Protocols & Architecture

As an advanced cybersecurity platform, MetaShield-X must not only detect threats but also protect its own internal infrastructure. This document outlines the security mechanisms implemented across the frontend and backend layers.

## 1. Backend API Security (FastAPI)

### Cross-Origin Resource Sharing (CORS)
The FastAPI backend is protected by a strict CORS configuration middleware.
- **Why it matters**: By default, web browsers block frontend code from calling an API on a different domain or port. Without CORS, a malicious third-party website could try to send forged data to our API.
- **Implementation**: The backend explicitly only allows `POST` requests to the `/api/v1/events` endpoint from authorized origins (in development, this is strictly bound to `http://localhost:3002`).

### Asynchronous Non-Blocking I/O
- **DDoS Mitigation**: Traditional synchronous Python frameworks (like Django or Flask) block the main thread while processing a request. During a volumetric DDoS attack, the server threads exhaust immediately, crashing the application.
- **FastAPI Implementation**: Because FastAPI is built on ASGI (Asynchronous Server Gateway Interface), network I/O operations are offloaded to an event loop. The server can ingest thousands of malicious telemetry logs concurrently without crashing.

### Stateless Inference
The ML engines do not rely on a persistent database connection (like PostgreSQL) for real-time inference. 
- **Benefit**: This eliminates the risk of SQL Injection attacks on the live telemetry stream. Furthermore, it prevents the database from becoming a bottleneck under heavy network load, ensuring the system cannot be brought down by a database crash.

## 2. Frontend Security (Next.js)

### Protection Against XSS (Cross-Site Scripting)
React and Next.js inherently protect against XSS attacks by automatically escaping data and stringifying variables before rendering them to the DOM.
- **Implementation**: Even if a malicious packet with a script payload is ingested by the backend and sent to the frontend dashboard stream, the Next.js `AnimatePresence` ledger will render it safely as a raw string, preventing browser execution.

### Environment Variable Protection
Critical configuration data is never exposed to the client.
- **Implementation**: Next.js strictly separates server-side and client-side `.env` variables. Only variables prefixed with `NEXT_PUBLIC_` are bundled into the browser JavaScript. All other configuration variables remain securely on the server.
