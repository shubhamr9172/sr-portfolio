from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import summary, diagnostics, logistics
app = FastAPI(title="Digital Control Room API")

# Configure CORS for Next.js frontend
# Configure CORS
origins = [
    "http://localhost:3000",
    os.environ.get("FRONTEND_URL", "*")
]

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
