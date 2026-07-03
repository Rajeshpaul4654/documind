from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db.postgres import get_db, QueryHistory
from pipeline.embeddings import search_similar
from groq import Groq
import os
import uuid
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class QueryRequest(BaseModel):
    doc_id: str
    question: str

@router.post("/query")
def query_document(request: QueryRequest, db: Session = Depends(get_db)):
    relevant_chunks = search_similar(request.doc_id, request.question)
    context = "\n\n".join(relevant_chunks)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant. Answer questions based only on the provided document context."
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion: {request.question}"
            }
        ]
    )

    answer = response.choices[0].message.content

    history = QueryHistory(
        id=str(uuid.uuid4()),
        document_id=request.doc_id,
        question=request.question,
        answer=answer
    )
    db.add(history)
    db.commit()

    return {
        "question": request.question,
        "answer": answer,
        "chunks_used": len(relevant_chunks)
    }