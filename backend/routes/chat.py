from fastapi import APIRouter

from pydantic import BaseModel

from google import genai

import os

from dotenv import load_dotenv

from services.chroma_service import (
    search_document
)

load_dotenv()

router = APIRouter()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    client = genai.Client(api_key=api_key)
else:
    client = None


class ChatRequest(BaseModel):

    question: str

    document_id: str


@router.post("/chat")
async def chat_with_pdf(
    request: ChatRequest
):

    try:

        relevant_chunks = search_document(
            request.question,
            request.document_id
        )

        context = "\n\n".join(
            relevant_chunks
        )

        prompt = f"""
        Answer the question using the provided study material only.

        STUDY MATERIAL:
        {context}

        QUESTION:
        {request.question}
        """

        if not client:
            return {"error": "GEMINI_API_KEY not configured"}

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {
            "answer": response.text,
            "document_used": request.document_id
        }

    except Exception as e:

        return {
            "error": str(e)
        }