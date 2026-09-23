# MetaShield-X: Machine Learning & Intelligence Layer

This document specifically covers the mathematical models and probabilistic logic that power the MetaShield-X intelligence layer. This is what sets the platform apart from standard static firewalls.

## 1. Directory Structure & The "Pure Python" Philosophy

**Location**: `backend/app/ml/`
- `bayesian.py`
- `novelty.py`
- `drift.py`

### The Philosophy
Most ML projects default to using PyTorch, TensorFlow, or Scikit-Learn. We intentionally rejected these libraries. 
**Why?** Massive tensor libraries require heavy GPU drivers and C++ compilers to install. This creates "Dependency Hell", especially on Windows. 
Instead, we engineered all three models from scratch using **Pure Native Python** (using only the standard `math` and `random` libraries). This makes the ML engine incredibly lightweight, highly portable, and extremely fast to execute.

---

## 2. Model 1: The Novelty Detector (Shannon Entropy)

**Location**: `novelty.py`
**The Problem**: A firewall cannot stop an attack if a signature for that attack hasn't been written yet (Zero-Day attacks).
**The Solution**: We don't look for signatures; we look for chaos.

**The Math (Shannon Entropy)**:
The Novelty Detector calculates the Shannon Entropy ($H$) of incoming network data.
$$ H(X) = - \sum (P(x_i) \times \log_2 P(x_i)) $$
Where $P(x_i)$ is the probability of a specific network characteristic occurring. 
If an attacker uses a brand new, highly polymorphic attack, the data will look structurally disorganized and chaotic. The entropy calculation will spike drastically. 
The system maintains a moving-average "baseline" of normal traffic entropy. If an incoming event crosses the boundary threshold, the system immediately isolates it as a `NOVELTY` (Zero-Day threat), regardless of whether it recognizes the signature or not.

---

## 3. Model 2: The Bayesian Few-Shot Engine

**Location**: `bayesian.py`
**The Problem**: Deep learning models need millions of data points to learn what a new threat looks like. We don't have time for that during an active cyber attack.
**The Solution**: Few-Shot Learning via Bayes' Theorem.

**The Math (Bayesian Probability)**:
Instead of building a massive neural network, we maintain mathematical "Prototypes" (mean and variance matrices) of known threats. 
When a new event arrives, we calculate the conditional probability that it belongs to a specific threat prototype using Bayes' Theorem:
$$ P(A|B) = \frac{P(B|A) \times P(A)}{P(B)} $$
Because we are just updating probability distributions (Gaussian distances) rather than retraining millions of neural weights, the engine can "learn" what a new attack looks like after seeing it just 2 or 3 times (Few-Shot). It adapts instantly.

---

## 4. Model 3: The Concept Drift Monitor

**Location**: `drift.py`
**The Problem**: A model trained on January's network traffic will be highly inaccurate by July, because normal internet behavior changes over time. This is called Concept Drift.
**The Solution**: Statistical Divergence Tracking.

**The Math (Kullback-Leibler Divergence)**:
The system continuously tracks the probability distribution of incoming traffic today versus the probability distribution of the traffic it originally learned from. It calculates the KL-Divergence between the two distributions:
$$ D_{KL}(P || Q) = \sum P(x) \times \log\left(\frac{P(x)}{Q(x)}\right) $$
This calculation is presented on the frontend dashboard as a "Drift Percentage". If the divergence becomes statistically significant (e.g., > 14%), the engine triggers a flag indicating that the underlying AI prototypes are becoming outdated and need a recalibration cycle.
