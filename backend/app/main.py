from fastapi import FastAPI

app = FastAPI(
    title="Clinical Lab Results Analyzer API",
    version="1.0.0"
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is running"
    }