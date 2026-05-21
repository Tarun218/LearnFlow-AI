import chromadb

from sentence_transformers import SentenceTransformer
import torch

torch.set_num_threads(1)

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
    "paraphrase-MiniLM-L3-v2"
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


def search_document(
    query,
    document_id,
    k=3
):

    query_embedding = model.encode(
        [query]
    ).tolist()

    results = collection.query(
        query_embeddings=query_embedding,
        n_results=k,
        where={
            "document_id": document_id
        }
    )

    return results["documents"][0]


def get_document_chunks(
    document_id,
    limit=10
):

    results = collection.get(
        where={
            "document_id": document_id
        },
        limit=limit
    )

    return results["documents"]


def get_all_documents():

    results = collection.get()

    metadatas = results["metadatas"]

    document_ids = set()

    for metadata in metadatas:

        document_ids.add(
            metadata["document_id"]
        )

    return list(document_ids)