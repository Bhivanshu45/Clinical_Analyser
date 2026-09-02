from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.lab_routes import router as lab_router
from app.api.analysis_routes import router as analysis_router


app = FastAPI(
    title="Clinical Lab Analyser API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(lab_router)
app.include_router(analysis_router)


@app.get("/")
def root():
    return {
        "message": "Clinical Lab Analyser API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }