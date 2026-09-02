from fastapi import APIRouter

from app.services.lab_service import (
    get_all_lab_tests,
    get_all_results,
    get_abnormal_results,
    search_tests_by_name,
)


router = APIRouter(
    prefix="/api/labs",
    tags=["Labs"],
)


@router.get("/")
def get_labs():
    return get_all_lab_tests()


@router.get("/processed")
def get_processed_labs():
    return get_all_results()


@router.get("/abnormal")
def get_abnormal_labs():
    return get_abnormal_results()


@router.get("/search")
def search_labs(test_name: str):
    return search_tests_by_name(test_name)