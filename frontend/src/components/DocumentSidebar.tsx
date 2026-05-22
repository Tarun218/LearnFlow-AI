"use client";

import { useEffect } from "react";

import { API_BASE } from "@/lib/api";
import { useDocumentStore }
from "@/store/documentStore";

export default function DocumentSidebar() {

  const {
    documents,
    activeDocument,
    setDocuments,
    setActiveDocument,
  } = useDocumentStore();

  useEffect(() => {

    fetchDocuments();

  }, []);

  const fetchDocuments = async () => {

    try {

      const response = await fetch(
        `${API_BASE}/documents`
      );

      const data = await response.json();

      if (data.documents) {

        setDocuments(data.documents);

        if (
          data.documents.length > 0 &&
          !activeDocument
        ) {

          setActiveDocument(
            data.documents[0]
          );
        }
      }

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="w-[320px] bg-gray-950 border-r border-gray-800 p-6 flex flex-col">

      <h2 className="text-2xl font-bold mb-6">
        Documents
      </h2>

      <div className="flex flex-col gap-3">

        {documents.map((doc) => (

          <button
            key={doc}
            onClick={() =>
              setActiveDocument(doc)
            }
            className={`text-left p-4 rounded-xl border transition ${
              activeDocument === doc
                ? "bg-white text-black border-white"
                : "bg-black border-gray-800 hover:border-gray-600"
            }`}
          >
            {doc}
          </button>
        ))}
      </div>

      {activeDocument && (

        <div className="mt-auto pt-6 border-t border-gray-800">

          <p className="text-sm text-gray-400 mb-2">
            Active Document
          </p>

          <p className="font-semibold break-words">
            {activeDocument}
          </p>

        </div>
      )}
    </div>
  );
}