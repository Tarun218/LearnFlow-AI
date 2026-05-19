import os
import shutil
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile
from pypdf import PdfReader

from services.gemini import summarize_study_material

router = APIRouter()

UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
MAX_SUMMARY_CHARS = 4000


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required")

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    safe_name = Path(file.filename).name
    file_path = UPLOAD_DIR / safe_name

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        reader = PdfReader(str(file_path))
        extracted_text = ""

        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_text += text

        if not extracted_text.strip():
            raise HTTPException(
                status_code=400,
                detail="No text could be extracted from this PDF",
            )

        limited_text = extracted_text[:MAX_SUMMARY_CHARS]

        try:
            summary = summarize_study_material(limited_text)
        except RuntimeError as exc:
            summary = f"Summary unavailable: {exc}"

        return {
            "message": "PDF uploaded successfully",
            "filename": safe_name,
            "text_preview": extracted_text[:1000],
            "summary": summary,
        }

    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
