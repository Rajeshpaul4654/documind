# DocuMind AI

An AI-powered document intelligence platform. Upload any PDF and ask questions about it in plain English. Built with a full RAG (Retrieval Augmented Generation) pipeline.

## Live Demo
Coming soon — deploying to Render

## Features

- Upload any PDF document
- Ask questions in natural language
- AI answers grounded in your document — no hallucination
- Query history saved to database
- Clean chat interface

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite |
| Backend | FastAPI, Python |
| RAG Pipeline | LangChain, Sentence-Transformers |
| Vector Store | ChromaDB |
| LLM | Groq (Llama 3.3 70B) |
| Database | SQLite |
| DevOps | GitHub Actions CI/CD |
| Deployment | Render |

## Architecture
## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Groq API key (free at console.groq.com)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your GROQ_API_KEY to .env
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### API Docs
Visit `http://127.0.0.1:8000/docs` for interactive API documentation.

## CI/CD
GitHub Actions automatically runs on every push to main:
- Backend: installs dependencies, lints with ruff, runs pytest
- Frontend: installs dependencies, builds with Vite

## Project Structure

documind/
├── backend/
│   ├── main.py
│   ├── routes/
│   │   ├── upload.py
│   │   └── query.py
│   ├── pipeline/
│   │   ├── ingest.py
│   │   └── embeddings.py
│   └── db/
│       └── postgres.py
├── frontend/
│   └── src/
│       ├── App.jsx
│       └── components/
│           ├── Upload.jsx
│           ├── Chat.jsx
│           └── Documents.jsx
└── .github/
└── workflows/
└── ci.yml

## Author
Rajesh Paul — [GitHub](https://github.com/Rajeshpaul4654) | [LinkedIn](https://linkedin.com/in/rajesh-paul-446717382)
