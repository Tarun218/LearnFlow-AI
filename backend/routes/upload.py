from fastapi import APIRouter, UploadFile, File

import shutil

from pypdf import PdfReader

import google.generativeai as genai

import os

from dotenv import load_dotenv

from services.embedding_service import (
    create_embeddings
)

load_dotenv()

router = APIRouter()

# Configure Gemini
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    try:

        file_path = f"uploads/{file.filename}"

        # Save PDF
        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        # Extract PDF text
        reader = PdfReader(file_path)

        extracted_text = ""

        for page in reader.pages:

            text = page.extract_text()

            if text:

                extracted_text += text

        # Create embeddings
        total_chunks = create_embeddings(
            extracted_text
        )

        # Limit text for summary
        limited_text = extracted_text[:4000]

        summary = "AI summary unavailable."

        try:

            prompt = f"""
            Summarize the following study material clearly and concisely:

            {limited_text}
            """

            response = model.generate_content(prompt)

            summary = response.text

        except Exception as ai_error:

            summary = f"Gemini API Error: {str(ai_error)}"

        return {
            "message": "PDF uploaded successfully",
            "filename": file.filename,
            "chunks_created": total_chunks,
            "text_preview": extracted_text[:1000],
            "summary": summary
        }

    except Exception as e:

        return {
            "error": str(e)
        }