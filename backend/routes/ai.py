from fastapi import APIRouter, HTTPException

from services.gemini import summarize_study_material

router = APIRouter()


@router.post("/summarize")
async def summarize_text(text: str):
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Text is required")

    try:
        summary = summarize_study_material(text)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RuntimeError as exc:
        status = 500 if "GEMINI_API_KEY" in str(exc) else 502
        raise HTTPException(status_code=status, detail=str(exc)) from exc

    return {"summary": summary}
