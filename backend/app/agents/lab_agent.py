from app.schemas.lab import (
    AnalysisRequest,
    AnalysisResponse,
    ProcessedLabTest,
)
from app.services.lab_processor import process_lab_results
from app.services.ai_service import generate_lab_explanation


DISCLAIMER = (
    "This analysis is for educational purposes only and is not a medical "
    "diagnosis. Please consult a qualified healthcare professional for "
    "medical advice."
)


def route_results(
    processed_results: list[ProcessedLabTest],
) -> list[ProcessedLabTest]:
    severity_order = {
        "critical": 0,
        "warning": 1,
        "normal": 2,
        "unknown": 3,
    }

    return sorted(
        processed_results,
        key=lambda result: severity_order.get(
            result.status,
            4
        )
    )


def generate_summary(
    processed_results: list[ProcessedLabTest],
) -> str:
    total_tests = len(processed_results)

    normal_count = sum(
        1
        for result in processed_results
        if result.status == "normal"
    )

    warning_count = sum(
        1
        for result in processed_results
        if result.status == "warning"
    )

    critical_count = sum(
        1
        for result in processed_results
        if result.status == "critical"
    )

    unknown_count = sum(
        1
        for result in processed_results
        if result.status == "unknown"
    )

    summary = (
        f"Out of {total_tests} submitted tests, "
        f"{normal_count} are normal, "
        f"{warning_count} need attention, and "
        f"{critical_count} are critical."
    )

    if unknown_count > 0:
        summary += (
            f" Status could not be determined for "
            f"{unknown_count} test(s)."
        )

    return summary


def generate_recommendations(
    processed_results: list[ProcessedLabTest],
) -> list[str]:
    recommendations = []

    has_critical = any(
        result.status == "critical"
        for result in processed_results
    )

    has_warning = any(
        result.status == "warning"
        for result in processed_results
    )

    if has_critical:
        recommendations.append(
            "One or more results are significantly outside the provided "
            "reference range. Consider seeking prompt medical advice."
        )

    if has_warning:
        recommendations.append(
            "Some results are outside the provided reference range. "
            "Consider discussing them with a qualified healthcare "
            "professional."
        )

    if not has_critical and not has_warning:
        recommendations.append(
            "All classified results are within the provided reference "
            "ranges."
        )

    return recommendations


def analyze_with_agent(
    request: AnalysisRequest,
) -> AnalysisResponse:
    processed_results = process_lab_results(
        request.test_results
    )

    routed_results = route_results(
        processed_results
    )

    explained_results = add_ai_explanations(
        routed_results
    )

    summary = generate_summary(
        explained_results
    )

    recommendations = generate_recommendations(
        explained_results
    )

    return AnalysisResponse(
        summary=summary,
        processed_results=explained_results,
        recommendations=recommendations,
        disclaimer=DISCLAIMER,
    )

def add_ai_explanations(
    processed_results: list[ProcessedLabTest],
) -> list[ProcessedLabTest]:

    for result in processed_results:
        result.explanation = generate_lab_explanation(
            test_name=result.test_name,
            result=result.result,
            unit=result.unit,
            reference_range=result.reference_range,
            status=result.status,
        )

    return processed_results