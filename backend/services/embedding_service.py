from sentence_transformers import SentenceTransformer

import faiss

import numpy as np

# Load embedding model
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# Store chunks
document_chunks = []

# Vector dimension
dimension = 384

# Create FAISS index
index = faiss.IndexFlatL2(dimension)


def split_text(text, chunk_size=500):

    chunks = []

    for i in range(0, len(text), chunk_size):

        chunk = text[i:i + chunk_size]

        if chunk.strip():

            chunks.append(chunk)

    return chunks


def create_embeddings(text):

    global document_chunks
    global index

    # Reset old data
    document_chunks = []

    index = faiss.IndexFlatL2(dimension)

    chunks = split_text(text)

    if len(chunks) == 0:

        return 0

    document_chunks = chunks

    embeddings = model.encode(chunks)

    embeddings = np.array(
        embeddings,
        dtype="float32"
    )

    index.add(embeddings)

    return len(chunks)


def search_chunks(query, k=3):

    global document_chunks
    global index

    # No chunks available
    if len(document_chunks) == 0:

        return []

    query_embedding = model.encode([query])

    query_embedding = np.array(
        query_embedding,
        dtype="float32"
    )

    k = min(k, len(document_chunks))

    distances, indices = index.search(
        query_embedding,
        k
    )

    results = []

    for idx in indices[0]:

        if (
            idx >= 0 and
            idx < len(document_chunks)
        ):

            results.append(
                document_chunks[idx]
            )

    return results