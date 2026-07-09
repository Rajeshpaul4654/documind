import chromadb
import hashlib

chroma_client = chromadb.PersistentClient(path="./chroma_store")

def simple_embedding(text: str) -> list[float]:
    words = text.lower().split()
    vector = [0.0] * 384
    for i, word in enumerate(words):
        hash_val = int(hashlib.md5(word.encode()).hexdigest(), 16)
        vector[hash_val % 384] += 1.0
    max_val = max(vector) if max(vector) > 0 else 1.0
    return [v / max_val for v in vector]

def get_or_create_collection(doc_id: str):
    return chroma_client.get_or_create_collection(name=f"doc_{doc_id}")

def store_embeddings(doc_id: str, chunks: list[str]):
    collection = get_or_create_collection(doc_id)
    embeddings = [simple_embedding(chunk) for chunk in chunks]
    ids = [f"{doc_id}_chunk_{i}" for i in range(len(chunks))]
    collection.add(embeddings=embeddings, documents=chunks, ids=ids)

def search_similar(doc_id: str, query: str, top_k: int = 3) -> list[str]:
    collection = get_or_create_collection(doc_id)
    query_embedding = simple_embedding(query)
    results = collection.query(query_embeddings=[query_embedding], n_results=top_k)
    return results["documents"][0]