from mcp.server.fastmcp import FastMCP

from app.services.lab_service import (
    get_all_results,
    search_tests_by_name,
)


mcp = FastMCP(
    "Clinical Lab Analyzer"
)

@mcp.tool()
def search_lab_test(test_name: str) -> list[dict]:
    """
    Search the dataset for a laboratory test by name.
    """

    results = search_tests_by_name(test_name)

    return [
        result.model_dump(mode="json")
        for result in results
    ]


@mcp.tool()
def get_abnormal_lab_results() -> list[dict]:
    """
    Get all abnormal laboratory results from the dataset.
    """

    results = get_all_results()

    abnormal_results = [
        result
        for result in results
        if result.status in ["warning", "critical"]
    ]

    return [
        result.model_dump(mode="json")
        for result in abnormal_results
    ]


@mcp.tool()
def get_reference_range(test_name: str) -> dict:
    """
    Look up reference information for a laboratory test
    from the Kaggle dataset.
    """

    results = search_tests_by_name(test_name)

    if not results:
        return {
            "found": False,
            "message": f"No reference information found for {test_name}."
        }

    test = results[0]

    return {
        "found": True,
        "test_name": test.test_name,
        "reference_range": test.reference_range,
        "unit": test.unit,
    }


if __name__ == "__main__":
    mcp.run()