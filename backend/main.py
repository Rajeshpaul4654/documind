from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.postgres import init_db
from routes.upload import router as upload_router
from routes.query import router as query_router

app = FastAPI(title="DocuMind AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(query_router)

@app.on_event("startup")
def startup():
    init_db()

@app.get("/")
def root():
    return {"message": "DocuMind AI is running"}