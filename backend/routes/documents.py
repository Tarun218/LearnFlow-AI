from fastapi import APIRouter

from services.chroma_service import (
    get_all_documents
)

router = APIRouter()


@router.get("/documents")
async def get_documents():

    try:

        documents = get_all_documents()

        return {
            "documents": documents
        }

    except Exception as e:

        return {
            "error": str(e)
        }