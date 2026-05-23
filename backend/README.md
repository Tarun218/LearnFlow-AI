# LearnFlow AI — Backend

FastAPI service for [LearnFlow AI](../README.md).

## Quick start

```bash
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn main:app --reload --port 8000
```

Docs: http://127.0.0.1:8000/docs

## Deploy

- **Hugging Face Spaces (Docker):** use `Dockerfile`, port `7860`
- **Docker:** `docker build -t learnflow-api .`

On Hugging Face, enable a **persistent storage volume** (`/data`) in Space settings so SQLite, uploads, and Chroma survive restarts. The app writes to `/data` when that folder exists, otherwise `./data`.

See the [root README](../README.md) for environment variables and CORS setup.
