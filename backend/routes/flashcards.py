from fastapi import APIRouter

import google.genai as genai

import os

from dotenv import load_dotenv

from services.chroma_service import (
    get_document_chunks,
    get_all_documents
)

load_dotenv()

router = APIRouter()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


@router.post("/generate-flashcards")
async def generate_flashcards():

    try:

        documents = get_all_documents()

        if len(documents) == 0:

            return {
                "error": "No PDF uploaded yet"
            }

        active_document = documents[-1]

        chunks = get_document_chunks(
            active_document
        )

        context = "\n\n".join(chunks)

        prompt = f"""
        Generate 10 study flashcards from the following material.

        Format:
        Q: question
        A: answer

        STUDY MATERIAL:
        {context}
        """

        response = model.generate_content(
            prompt
        )

        return {
            "flashcards": response.text,
            "document_used": active_document
        }

    except Exception as e:

        return {
            "error": str(e)
        }