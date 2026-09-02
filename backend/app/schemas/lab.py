from datetime import date
from typing import Optional, Union

from pydantic import BaseModel, Field


class LabTest(BaseModel):
    date: date
    test_name: str = Field(..., min_length=1)
    result: Union[float, str]
    unit: Optional[str] = None
    reference_range: Optional[str] = None
    status: Optional[str] = None
    comment: Optional[str] = None
    min_reference: Optional[float] = None
    max_reference: Optional[float] = None
    unit_description: Optional[str] = None
    recommended_followup: Optional[str] = None


class AnalysisRequest(BaseModel):
    query: str = Field(..., min_length=1)


class ProcessedLabTest(BaseModel):
    date: date
    test_name: str
    result: Union[float, str]
    unit: Optional[str] = None
    reference_range: Optional[str] = None
    status: str
    comment: Optional[str] = None
    recommended_followup: Optional[str] = None


class AnalysisResponse(BaseModel):
    summary: str
    processed_results: list[ProcessedLabTest]
    recommendations: list[str]
    disclaimer: str