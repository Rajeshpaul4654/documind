import chromadb
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
chroma_client = chromadb.PersistentClient(path="./chroma_store")

def get_or_create_collection(doc_id: str):
    return chroma_client.get_or_create_collection(name=f"doc_{doc_id}")

def store_embeddings(doc_id: str, chunks: list[str]):
    collection = get_or_create_collection(doc_id)
    embeddings = model.encode(chunks).tolist()
    ids = [f"{doc_id}_chunk_{i}" for i in range(len(chunks))]
    collection.add(embeddings=embeddings, documents=chunks, ids=ids)

def search_similar(doc_id: str, query: str, top_k: int = 3) -> list[str]:
    collection = get_or_create_collection(doc_id)
    query_embedding = model.encode([query]).tolist()
    results = collection.query(query_embeddings=query_embedding, n_results=top_k)
    return results["documents"][0]