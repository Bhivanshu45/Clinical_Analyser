from datetime import date

from typing import Optional, Union

from pydantic import BaseModel, Field


class LabTest(BaseModel):

    date: Optional[date] = None

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

    patient_age: Optional[int] = Field(
        None,
        ge=0,
        le=120
    )

    patient_gender: Optional[str] = None

    test_results: list[LabTest] = Field(
        ...,
        min_length=1
    )


class ProcessedLabTest(BaseModel):

    date: Optional[date] = None

    test_name: str

    result: Union[float, str]

    unit: Optional[str] = None

    reference_range: Optional[str] = None

    status: str

    comment: Optional[str] = None

    recommended_followup: Optional[str] = None

    min_reference: Optional[float] = None

    max_reference: Optional[float] = None

    explanation: Optional[str] = None


class AnalysisResponse(BaseModel):

    summary: str

    processed_results: list[ProcessedLabTest]

    recommendations: list[str]

    disclaimer: str