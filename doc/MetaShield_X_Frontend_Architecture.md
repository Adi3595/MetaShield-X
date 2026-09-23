# MetaShield-X: Frontend Architecture & UI/UX Layer

This document specifically covers the architecture, technologies, and design philosophy of the "Command Center"—the frontend visual layer of MetaShield-X.

## 1. Directory Structure & Technologies

**Location**: `frontend/`
**Core Technologies**:
- **Next.js 14+ (App Router)**: The core React framework. We utilize the `src/app/` directory for routing.
- **Tailwind CSS v4**: Utility-first CSS framework for rapid styling.
- **Framer Motion**: An animation library for React used to create cinematic, fluid micro-interactions.
- **TypeScript**: Ensures type safety across all React components and API fetching logic.

## 2. Design Philosophy: The Avant-Garde "Awwwards" Aesthetic

Cybersecurity dashboards are traditionally dense, spreadsheet-like interfaces. This leads to **Analyst Alert Fatigue**—a psychological phenomenon where analysts ignore warnings because their screens are constantly cluttered with sterile data.

**The Solution:**
We abandoned the traditional "dashboard" look and engineered an **Avant-Garde Cinematic Ledger**.
1. **The Palette**: We use Absolute Carbon Black (`#111111`) to reduce eye strain, paired with piercing Electric Chartreuse (`#D4FF00`) exclusively for high-priority alerts.
2. **Typography**: We mix massive editorial typography (Playfair Display) with technical geometric fonts (Space Grotesk). Sizing text up to `12vw` creates a structural, high-end feel.
3. **Motion**: Using Framer Motion, elements don't just "appear"—they slide, stagger, and assemble themselves fluidly, making the UI feel like a futuristic Heads Up Display (HUD).

## 3. Core Pages & Components

### `frontend/src/app/page.tsx` (The Hero Landing)
This is the entry point. It utilizes a massive, overlapping typographical layout that breaks traditional web grids. It features a scrolling chartreuse ticker tape at the bottom and floating, frosted-glass data panels (`backdrop-blur-md`) that asynchronously load in.

### `frontend/src/app/dashboard/page.tsx` (The Cinematic Ledger)
This replaces the standard "Data Table". 
- It maintains a React `useState` array to store a live stream of telemetry events.
- An asynchronous `fetchEvent` function polls the Python Backend API (`http://localhost:8000/api/v1/events`).
- The incoming data is rendered using `<AnimatePresence>` from Framer Motion, ensuring that as new network logs arrive, they smoothly spring into view from the top while old logs fade out at the bottom.

### Component Reusability (`src/components/ui/`)
- **`Card.tsx`**: A structural container that enforces 1px grid borders without relying on artificial drop-shadows.
- **`MetricBox.tsx`**: Specialized, highly legible KPI boxes that change color dynamically (e.g., flashing red if an anomaly is detected).

## 4. How the Frontend Connects to the Backend

The frontend is entirely decoupled from the backend. It acts as a pure presentation layer. 
Inside the dashboard, the `useEffect` hook triggers a continuous polling mechanism. It sends a structured JSON payload (containing a timestamp, Source IP, Dest IP, and Protocol) to the FastAPI server. It awaits the mathematical classification (Safe vs Threat) and immediately updates the React state to render the cinematic ledger.
