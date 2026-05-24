import os

from dotenv import load_dotenv

load_dotenv()

MODEL_NAME = "gemini-2.5-flash"
_api_key = os.getenv("GEMINI_API_KEY")
_client = None


def is_configured() -> bool:
    return bool(_api_key)


def _get_client():
    global _client
    if not _api_key:
        return None
    if _client is None:
        from google import genai

        _client = genai.Client(api_key=_api_key)
    return _client


def summarize_study_material(text: str) -> str:
    """Summarize text via Gemini. Raises ValueError or RuntimeError on failure."""
    if not text or not text.strip():
        raise ValueError("Text is required")

    client = _get_client()
    if client is None:
        raise RuntimeError("GEMINI_API_KEY is not configured in backend/.env")

    prompt = (
        "Summarize the following study material clearly and concisely:\n\n"
        f"{text.strip()}"
    )

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )
    except Exception as exc:
        raise RuntimeError(f"Gemini API error: {exc}") from exc

    if not response.text:
        raise RuntimeError("Gemini returned an empty response")

    return response.text
