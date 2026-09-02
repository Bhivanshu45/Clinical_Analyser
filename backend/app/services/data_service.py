# load and validate CSV
from csv import DictReader
from pathlib import Path
from typing import Optional

from app.schemas.lab import LabTest


DATA_FILE_PATH = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "lab_tests.csv"
)


def convert_to_float(value: Optional[str]) -> Optional[float]:
    if value is None or value.strip() == "":
        return None

    try:
        return float(value)
    except ValueError:
        return None


def convert_result(value: Optional[str]) -> float | str:
    if value is None:
        return ""

    value = value.strip()

    try:
        return float(value)
    except ValueError:
        return value


def load_lab_data() -> list[LabTest]:
    if not DATA_FILE_PATH.exists():
        raise FileNotFoundError(
            f"Lab dataset not found at: {DATA_FILE_PATH}"
        )

    lab_tests = []

    with open(
        DATA_FILE_PATH,
        mode="r",
        encoding="utf-8-sig",
        newline="",
    ) as file:
        reader = DictReader(file)

        for row in reader:
            lab_test = LabTest(
                date=row["Date"],
                test_name=row["Test_Name"].strip(),
                result=convert_result(row.get("Result")),
                unit=row.get("Unit") or None,
                reference_range=row.get("Reference_Range") or None,
                status=row.get("Status") or None,
                comment=row.get("Comment") or None,
                min_reference=convert_to_float(
                    row.get("Min_Reference")
                ),
                max_reference=convert_to_float(
                    row.get("Max_Reference")
                ),
                unit_description=row.get("Unit_Description") or None,
                recommended_followup=(
                    row.get("Recommended_Followup") or None
                ),
            )

            lab_tests.append(lab_test)

    return lab_tests