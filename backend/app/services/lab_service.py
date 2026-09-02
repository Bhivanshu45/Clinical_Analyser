from app.schemas.lab import LabTest, ProcessedLabTest
from app.services.data_service import load_lab_data
from app.services.lab_processor import process_lab_results


def get_all_lab_tests() -> list[LabTest]:
    return load_lab_data()


def get_all_results() -> list[ProcessedLabTest]:
    lab_tests = get_all_lab_tests()

    return process_lab_results(lab_tests)


def get_abnormal_results() -> list[ProcessedLabTest]:
    results = get_all_results()

    return [
        result
        for result in results
        if result.status.lower() in ["high", "low"]
    ]


def search_tests_by_name(
    test_name: str,
) -> list[ProcessedLabTest]:
    results = get_all_results()

    search_value = test_name.strip().lower()

    return [
        result
        for result in results
        if search_value in result.test_name.lower()
    ]