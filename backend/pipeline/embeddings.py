import chromadb
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
chroma_client = chromadb.PersistentClient(path="./chroma_store")

def get_embedding(text: str) -> list:
    response = client.embeddings.create(
        model="nomic-embed-text-v1.5",
        input=text
    )
    return response.data[0].embedding

def get_or_create_collection(doc_id: str):
    return chroma_client.get_or_create_collection(name=f"doc_{doc_id}")

def store_embeddings(doc_id: str, chunks: list[str]):
    collection = get_or_create_collection(doc_id)
    embeddings = [get_embedding(chunk) for chunk in chunks]
    ids = [f"{doc_id}_chunk_{i}" for i in range(len(chunks))]
    collection.add(embeddings=embeddings, documents=chunks, ids=ids)

def search_similar(doc_id: str, query: str, top_k: int = 3) -> list[str]:
    collection = get_or_create_collection(doc_id)
    query_embedding = get_embedding(query)
    results = collection.query(query_embeddings=[query_embedding], n_results=top_k)
    return results["documents"][0]