# 🖥️ Digital Control Room — AI Engineer Portfolio

> *A high-fidelity, interactive portfolio built as a "Digital Control Room" — live AI demos, not screenshots.*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![NVIDIA NIM](https://img.shields.io/badge/NVIDIA_NIM-API-76b900?logo=nvidia)](https://build.nvidia.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📌 Overview

**Digital Control Room** is a production-grade, full-stack AI portfolio — designed to demonstrate real engineering capability rather than just list it. Every section is a **live, interactive demo** powered by large language models via the NVIDIA NIM API platform.

The aesthetic is a dark "mission control" environment: monospace typography, amber-gold accents, glassmorphism panels, and a reactive 3D Neural Topography animation as the hero backdrop.

---

## ✨ Features

| Demo | Capability Demonstrated |
|---|---|
| **01 · The Adaptive Interface** | Dynamic prompt engineering, STAR-method enforcement, JSON constraint parsing |
| **02 · L2 Diagnostic Terminal** | LLM-as-a-Guardrail pipeline, sequential inference, log tokenization, SOP generation |
| **03 · Logistics Reasoning Engine** | Chain-of-Thought reasoning, unstructured invoice data extraction, BI logic integration |

### Additional Highlights
- 🧠 **Neural Topography Hero** — Interactive 3D canvas animation with mouse-reactive particles and a telemetry HUD
- 🔍 **Developer Mode / X-Ray Architecture** — Toggle to reveal the system architecture overlay showing data flow
- 📋 **System Specs** — Technology stack and proficiency breakdown rendered as a styled dashboard
- 📅 **Op History (Experience)** — Professional timeline of roles and achievements
- 📄 **CV Download** — Résumé served directly from the app

---

## 🗂️ Project Structure

```
Latest Portfolio/
├── frontend/                        # Next.js 16 Application
│   ├── public/
│   │   └── Shubham_Resume.pdf       # Downloadable CV
│   ├── src/
│   │   ├── components/
│   │   │   ├── PortfolioSections/
│   │   │   │   ├── Hero.tsx         # Neural Topography hero + intro
│   │   │   │   ├── NeuralTopography.tsx  # 3D canvas animation
│   │   │   │   ├── NeuralCore.tsx   # Core animation utilities
│   │   │   │   ├── RAGAnimation.tsx # RAG data-flow visual
│   │   │   │   ├── Specs.tsx        # Tech stack dashboard
│   │   │   │   └── Experience.tsx   # Professional timeline
│   │   │   ├── HeroSearch.tsx       # Demo 01: Adaptive Interface
│   │   │   ├── TerminalWidget.tsx   # Demo 02: L2 Diagnostic Terminal
│   │   │   ├── LogisticsDropzone.tsx # Demo 03: Logistics Engine
│   │   │   ├── DeveloperModeToggle.tsx  # X-Ray mode trigger
│   │   │   └── SystemArchitectureOverlay.tsx # Architecture diagram
│   │   ├── context/                 # React Context providers
│   │   ├── pages/
│   │   │   └── index.tsx            # Main portfolio page
│   │   └── styles/
│   │       └── globals.css          # Global styles & CSS variables
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                         # FastAPI Application
│   ├── api/
│   │   ├── routes/
│   │   │   ├── summary.py           # POST /api/summary — Adaptive Interface
│   │   │   ├── diagnostics.py       # POST /api/safety-check, /api/diagnose-log
│   │   │   └── logistics.py         # POST /api/logistics — Reasoning Engine
│   │   └── __init__.py
│   ├── main.py                      # FastAPI app entry point + CORS config
│   └── requirements.txt
│
├── .env                             # API keys (⚠️ never commit)
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2 | React framework, SSR, routing |
| **React** | 19.2 | UI component layer |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Framer Motion** | 12.x | Scroll animations, transitions |
| **Lucide React** | 1.x | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **FastAPI** | 0.115 | High-performance async API |
| **Uvicorn** | 0.30 | ASGI server |
| **Pydantic** | 2.9 | Request/response validation |
| **OpenAI SDK** | 1.51 | NVIDIA NIM-compatible client |
| **python-dotenv** | 1.0 | Environment variable loading |

### AI / LLM Platform
| Model | Use Case |
|---|---|
| **Llama 3.1 8B Instruct** | Adaptive Interface — prompt engineering demo |
| **Nemotron-3 Content Safety** | Guardrail check before log analysis |
| **Nemotron-Super-120B** | L2 Diagnostic SOP generation |
| **Nemotron-Nano-Omni (Reasoning)** | Logistics invoice parsing with CoT |

All models are accessed via **[NVIDIA NIM](https://build.nvidia.com/)** — OpenAI-compatible endpoints.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **Python** ≥ 3.10
- **NVIDIA NIM API keys** (see [build.nvidia.com](https://build.nvidia.com/))

---

### 1. Clone the Repository

```bash
git clone https://github.com/shubhamr9172/sr-portfolio.git
cd sr-portfolio
```

---

### 2. Configure Environment Variables

Create a `.env` file in the project root (copy from the template below):

```env
# .env — NEVER commit this file

# NVIDIA NIM API Keys
LLAMA_3_1_8B_INSTRUCT_API_KEY="nvapi-..."
NEMOTRON_CONTENT_SAFETY_API_KEY="nvapi-..."
NEMOTRON_SUPER_120B_API_KEY="nvapi-..."
NEMOTRON_NANO_OMNI_REASONING_API_KEY="nvapi-..."
```

> 💡 Get free API keys at [build.nvidia.com](https://build.nvidia.com/). Most models offer a free tier.

---

### 3. Start the Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

Backend will be live at: **`http://localhost:8000`**
Auto-docs available at: **`http://localhost:8000/docs`**

---

### 4. Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend will be live at: **`http://localhost:3000`**

---

## 🔌 API Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Key Model |
|---|---|---|---|
| `GET` | `/health` | Backend health check | — |
| `POST` | `/api/summary` | Generate a professional summary from a job description | Llama 3.1 8B |
| `POST` | `/api/safety-check` | Run a guardrail check on input text | Nemotron Content Safety |
| `POST` | `/api/diagnose-log` | Parse a server log and generate a resolution SOP | Nemotron-Super-120B |
| `POST` | `/api/logistics` | Extract and analyze unstructured invoice data | Nemotron-Nano-Omni |

### Example: Diagnose Log
```bash
curl -X POST http://localhost:8000/api/diagnose-log \
  -H "Content-Type: application/json" \
  -d '{"raw_log": "ERROR: Connection refused to PostgreSQL on port 5432..."}'
```

---

## 🧩 Key Components Explained

### `HeroSearch.tsx` → Demo 01
Calls `/api/summary`. Takes a job description as input and uses **prompt engineering** (STAR method + action verb enforcement) to generate a tailored professional summary. Demonstrates structured output generation with JSON constraints.

### `TerminalWidget.tsx` → Demo 02
Implements a **sequential multi-model pipeline**:
1. Input log → `/api/safety-check` (Nemotron Content Safety as a guardrail)
2. If safe → `/api/diagnose-log` (Nemotron-120B generates a Markdown SOP)

Simulates an AI-assisted L2 support workflow.

### `LogisticsDropzone.tsx` → Demo 03
Calls `/api/logistics`. Accepts raw, unstructured invoice text and uses a **reasoning model** (Chain-of-Thought) to extract line items, calculate totals, and surface business intelligence insights.

### `NeuralTopography.tsx` / `Hero.tsx`
A Canvas-based 3D animation featuring:
- Mouse-reactive particle grid with procedural wave motion
- A live "telemetry HUD" overlay with simulated metrics
- Smooth Framer Motion transitions into the narrative content below

### `SystemArchitectureOverlay.tsx`
Toggled by `DeveloperModeToggle`. Renders a full-screen architecture diagram showing the data flow between frontend components, FastAPI routes, and NVIDIA NIM models — designed to show recruiters the "engineering behind the curtain."

---

## 🎨 Design System

The portfolio uses a custom **"Digital Control Room"** design language:

| Token | Value | Usage |
|---|---|---|
| `--gold` | `#C9A84C` | Primary accent, hover states, HUD elements |
| `bg-black` | `#000000` | Base background |
| `bg-zinc-950` | `#0A0A0A` | Section backgrounds |
| `bg-zinc-900` | `#18181B` | Card/panel backgrounds |
| Font (UI) | `Inter` / `Geist` | Body and headings |
| Font (Code) | `JetBrains Mono` | Monospace labels, HUD, terminal |

---

## 📁 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `LLAMA_3_1_8B_INSTRUCT_API_KEY` | ✅ | Powers the Adaptive Interface demo |
| `NEMOTRON_CONTENT_SAFETY_API_KEY` | ✅ | Guardrail model for the Diagnostic Terminal |
| `NEMOTRON_SUPER_120B_API_KEY` | ✅ | SOP generation in the Diagnostic Terminal |
| `NEMOTRON_NANO_OMNI_REASONING_API_KEY` | ✅ | Chain-of-Thought for the Logistics Engine |
| `FRONTEND_URL` | ⬜ Optional | Allowlisted CORS origin for production deployment |

---

## 🤝 Connect

Built by **Shubham Reddy** — AI & Automation Engineer

| Channel | Link |
|---|---|
| 📧 Email | [shubhamreddy9172@gmail.com](mailto:shubhamreddy9172@gmail.com) |
| 💼 LinkedIn | [linkedin.com/in/shubham-reddy](https://linkedin.com/in/shubham-reddy) |
| 🐙 GitHub | [github.com/shubhamreddy91](https://github.com/shubhamreddy91) |
| 📄 Resume | Available via the portfolio's "Download_CV" link |

---

## 📜 License

This project is open-sourced under the **MIT License**. Feel free to use the architecture and patterns as inspiration for your own portfolio.

---

<p align="center">
  <code>DIGITAL_CONTROL_ROOM_v1.0 // SECURE_LINK_ACTIVE // © SHUBHAM_REDDY_CORE_SYSTEMS</code>
</p>
