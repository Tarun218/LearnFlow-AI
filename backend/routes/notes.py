from fastapi import APIRouter

import google.generativeai as genai

import os

from dotenv import load_dotenv

import services.embedding_service as embedding_service

load_dotenv()

router = APIRouter()

# Configure Gemini
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


@router.post("/generate-notes")
async def generate_notes():

    try:

        if len(embedding_service.document_chunks) == 0:

            return {
                "error": "No PDF uploaded yet"
            }

        context = "\n\n".join(
            embedding_service.document_chunks[:10]
        )

        prompt = f"""
        Create concise and well-structured study notes from the following material.

        Include:
        - Important concepts
        - Key points
        - Definitions
        - Short explanations

        STUDY MATERIAL:
        {context}
        """

        response = model.generate_content(
            prompt
        )

        return {
            "notes": response.text
        }

    except Exception as e:

        return {
            "error": str(e)
        }