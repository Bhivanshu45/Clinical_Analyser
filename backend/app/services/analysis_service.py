from app.schemas.lab import AnalysisRequest, AnalysisResponse
from app.agents.lab_agent import analyze_with_agent


def analyze_lab_results(
    request: AnalysisRequest,
) -> AnalysisResponse:

    return analyze_with_agent(request)