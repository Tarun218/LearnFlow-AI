import os
from pathlib import Path


def get_data_dir() -> Path:
    """Writable directory for SQLite, uploads, and Chroma (HF: enable /data volume)."""
    candidates: list[str] = []
    if os.getenv("DATA_DIR"):
        candidates.append(os.getenv("DATA_DIR", ""))
    if Path("/data").is_dir():
        candidates.append("/data")
    candidates.append("./data")

    for raw in candidates:
        if not raw:
            continue
        path = Path(raw)
        try:
            path.mkdir(parents=True, exist_ok=True)
            return path.resolve()
        except OSError:
            continue

    fallback = Path("./data").resolve()
    fallback.mkdir(parents=True, exist_ok=True)
    return fallback
