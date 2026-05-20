import chromadb

from sentence_transformers import SentenceTransformer

# Persistent client
client = chromadb.PersistentClient(
    path="./chroma_db"
)

# Collection
collection = client.get_or_create_collection(
    name="learnflow_documents"
)

# Embedding model
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def split_text(text, chunk_size=500):

    chunks = []

    for i in range(0, len(text), chunk_size):

        chunk = text[i:i + chunk_size]

        if chunk.strip():

            chunks.append(chunk)

    return chunks


def store_document(text, document_id):

    chunks = split_text(text)

    embeddings = model.encode(
        chunks
    ).tolist()

    ids = [
        f"{document_id}_{i}"
        for i in range(len(chunks))
    ]

    metadatas = [
        {
            "document_id": document_id
        }
        for _ in chunks
    ]

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids,
        metadatas=metadatas
    )

    return len(chunks)


def search_document(query, k=3):

    query_embedding = model.encode(
        [query]
    ).tolist()

    results = collection.query(
        query_embeddings=query_embedding,
        n_results=k
    )

    return results["documents"][0]


def get_all_chunks(limit=10):

    results = collection.get(
        limit=limit
    )

    return results["documents"]