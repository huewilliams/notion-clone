import {create} from "zustand";
import {DocumentCollection} from "../firebase/collections/documentCollection";

interface DocumentState {
  document: DocumentCollection;
  setDocument: (document: DocumentCollection) => void;
  updateTitle: (title: string) => void;
  updateBannerUrl: (bannerUrl: string) => void;
}

const useDocumentStore = create<DocumentState>((set) => ({
  document: {
    id: '',
    title: '',
    bannerUrl: '',
    data: null
  },
  setDocument: (document: DocumentCollection) => set({document}),
  updateTitle: (title: string) => set((state) => ({ document: {...state.document, title}})),
  updateBannerUrl: (bannerUrl: string) => set((state) => ({ document: {...state.document, bannerUrl}})),
}));

export default useDocumentStore;
