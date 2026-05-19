import os

from dotenv import load_dotenv
from google.api_core import exceptions as google_exceptions

load_dotenv()

MODEL_NAME = "gemini-2.5-flash"
_api_key = os.getenv("GEMINI_API_KEY")
_model = None


def is_configured() -> bool:
    return bool(_api_key)


def _get_model():
    global _model
    if not _api_key:
        return None
    if _model is None:
        import google.generativeai as genai

        genai.configure(api_key=_api_key)
        _model = genai.GenerativeModel(MODEL_NAME)
    return _model


def summarize_study_material(text: str) -> str:
    """Summarize text via Gemini. Raises ValueError or RuntimeError on failure."""
    if not text or not text.strip():
        raise ValueError("Text is required")

    model = _get_model()
    if model is None:
        raise RuntimeError("GEMINI_API_KEY is not configured in backend/.env")

    prompt = (
        "Summarize the following study material clearly and concisely:\n\n"
        f"{text.strip()}"
    )

    try:
        response = model.generate_content(prompt)
    except google_exceptions.NotFound as exc:
        raise RuntimeError(
            f"Model '{MODEL_NAME}' is unavailable. {exc}"
        ) from exc
    except google_exceptions.GoogleAPIError as exc:
        raise RuntimeError(f"Gemini API error: {exc}") from exc

    if not response.text:
        raise RuntimeError("Gemini returned an empty response")

    return response.text
