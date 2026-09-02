from typing import Optional

from app.schemas.lab import LabTest, ProcessedLabTest


CRITICAL_THRESHOLD = 0.20


def get_test_status(
    result: float | str,
    min_reference: Optional[float],
    max_reference: Optional[float],
) -> str:
    if not isinstance(result, (int, float)):
        return "unknown"

    if min_reference is not None and result < min_reference:
        difference_ratio = (
            (min_reference - result) / min_reference
            if min_reference != 0
            else 0
        )

        if difference_ratio >= CRITICAL_THRESHOLD:
            return "critical"

        return "warning"

    if max_reference is not None and result > max_reference:
        difference_ratio = (
            (result - max_reference) / max_reference
            if max_reference != 0
            else 0
        )

        if difference_ratio >= CRITICAL_THRESHOLD:
            return "critical"

        return "warning"

    if min_reference is not None or max_reference is not None:
        return "normal"

    return "unknown"


def process_lab_test(test: LabTest) -> ProcessedLabTest:
    status = get_test_status(
        result=test.result,
        min_reference=test.min_reference,
        max_reference=test.max_reference,
    )

    return ProcessedLabTest(
        date=test.date,
        test_name=test.test_name,
        result=test.result,
        unit=test.unit,
        reference_range=test.reference_range,
        status=status,
        comment=test.comment,
        min_reference=test.min_reference,
        max_reference=test.max_reference,
        recommended_followup=test.recommended_followup,
    )


def process_lab_results(
    test_results: list[LabTest],
) -> list[ProcessedLabTest]:
    return [
        process_lab_test(test)
        for test in test_results
    ]