import os
import uuid
import shutil
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from db.postgres import get_db, Document
from pipeline.ingest import extract_text_from_pdf, chunk_text
from pipeline.embeddings import store_embeddings

router = APIRouter()

UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    doc_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{doc_id}.pdf"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_pdf(file_path)
    chunks = chunk_text(text)
    store_embeddings(doc_id, chunks)

    document = Document(id=doc_id, filename=file.filename, status="ready")
    db.add(document)
    db.commit()

    return {
        "doc_id": doc_id,
        "filename": file.filename,
        "chunks": len(chunks),
        "status": "ready"
    }

@router.get("/documents")
def list_documents(db: Session = Depends(get_db)):
    docs = db.query(Document).all()
    return [{"id": d.id, "filename": d.filename, "status": d.status} for d in docs]