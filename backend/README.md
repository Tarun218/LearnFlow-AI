---
title: LearnFlow AI Backend
emoji: 🚀
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# LearnFlow AI Backend

FastAPI backend for LearnFlow AI.

## Features

- Authentication
- PDF Upload
- AI Chat
- Quiz Generation
- Flashcards
- Notes Generation

## Local Development

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000