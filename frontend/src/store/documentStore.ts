import { create } from "zustand";

interface DocumentStore {

  documents: string[];

  activeDocument: string;

  setDocuments: (
    docs: string[]
  ) => void;

  setActiveDocument: (
    doc: string
  ) => void;
}

export const useDocumentStore =
  create<DocumentStore>((set) => ({

    documents: [],

    activeDocument: "",

    setDocuments: (docs) =>
      set({
        documents: docs
      }),

    setActiveDocument: (doc) =>
      set({
        activeDocument: doc
      }),
}));