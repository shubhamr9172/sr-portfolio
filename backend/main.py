import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from api.routes import summary, diagnostics, logistics

load_dotenv()

app = FastAPI(title="Digital Control Room API")

# Allow localhost for dev + Vercel URL for production (set FRONTEND_URL on Render)
origins = [
    "http://localhost:3000",
    "https://sr-portfolio.vercel.app",
    os.environ.get("FRONTEND_URL", ""),
]

# Remove any empty strings from origins list
origins = [o for o in origins if o]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(summary.router, prefix="/api")
app.include_router(diagnostics.router, prefix="/api")
app.include_router(logistics.router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}
