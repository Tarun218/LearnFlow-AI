import { create } from "zustand";

import { API_BASE } from "@/lib/api";

interface DocumentStore {
  documents: string[];
  activeDocument: string;
  loading: boolean;
  error: string;
  setDocuments: (docs: string[]) => void;
  setActiveDocument: (doc: string) => void;
  fetchDocuments: () => Promise<void>;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  activeDocument: "",
  loading: false,
  error: "",

  setDocuments: (docs) => set({ documents: docs }),

  setActiveDocument: (doc) => set({ activeDocument: doc }),

  fetchDocuments: async () => {
    set({ loading: true, error: "" });

    try {
      const response = await fetch(`${API_BASE}/documents`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ?? data.error ?? "Failed to load documents"
        );
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const docs: string[] = data.documents ?? [];
      set({ documents: docs });

      const current = get().activeDocument;

      if (docs.length === 0) {
        set({ activeDocument: "" });
      } else if (!current || !docs.includes(current)) {
        set({ activeDocument: docs[docs.length - 1] });
      }
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "Failed to load documents",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
