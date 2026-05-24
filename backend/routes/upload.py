from fastapi import APIRouter, UploadFile, File

import shutil

from pypdf import PdfReader

from google import genai

import os

from dotenv import load_dotenv

from config.paths import get_data_dir
from services.chroma_service import (
    store_document
)

UPLOAD_DIR = get_data_dir() / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

load_dotenv()

router = APIRouter()

# Initialize Gemini client
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    client = genai.Client(api_key=api_key)
else:
    client = None


@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    try:

        if not client:
            return {"error": "GEMINI_API_KEY not configured"}

        file_path = str(UPLOAD_DIR / file.filename)

        # Save PDF
        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        # Extract text
        reader = PdfReader(file_path)

        extracted_text = ""

        for page in reader.pages:

            text = page.extract_text()

            if text:

                extracted_text += text

        # Store in ChromaDB
        total_chunks = store_document(
            extracted_text,
            file.filename
        )

        # Summary
        limited_text = extracted_text[:4000]

        prompt = f"""
        Summarize the following study material clearly and concisely:

        {limited_text}
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {
            "message": "PDF uploaded successfully",
            "filename": file.filename,
            "chunks_created": total_chunks,
            "summary": response.text
        }

    except Exception as e:

        return {
            "error": str(e)
        }