from fastapi import APIRouter

from app.schemas.lab import AnalysisRequest, AnalysisResponse
from app.services.analysis_service import analyze_lab_results


router = APIRouter(
    prefix="/api/analysis",
    tags=["Analysis"],
)


@router.post("/", response_model=AnalysisResponse)
def analyze_labs(request: AnalysisRequest):

    return analyze_lab_results(request)