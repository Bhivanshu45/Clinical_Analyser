from typing import Optional

from app.schemas.lab import LabTest, ProcessedLabTest


def get_test_status(
    result: float | str,
    min_reference: Optional[float],
    max_reference: Optional[float],
    dataset_status: Optional[str] = None,
) -> str:
    if dataset_status:
        return dataset_status.lower()

    if not isinstance(result, (int, float)):
        return "unknown"

    if min_reference is not None and result < min_reference:
        return "low"

    if max_reference is not None and result > max_reference:
        return "high"

    if min_reference is not None or max_reference is not None:
        return "normal"

    return "unknown"


def process_lab_test(test: LabTest) -> ProcessedLabTest:
    status = get_test_status(
        result=test.result,
        min_reference=test.min_reference,
        max_reference=test.max_reference,
        dataset_status=test.status,
    )

    return ProcessedLabTest(
        date=test.date,
        test_name=test.test_name,
        result=test.result,
        unit=test.unit,
        reference_range=test.reference_range,
        status=status,
        comment=test.comment,
        recommended_followup=test.recommended_followup,
    )


def process_lab_results(
    test_results: list[LabTest],
) -> list[ProcessedLabTest]:
    return [
        process_lab_test(test)
        for test in test_results
    ]