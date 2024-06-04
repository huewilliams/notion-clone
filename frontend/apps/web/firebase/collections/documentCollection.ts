import {setDoc, doc, deleteDoc} from "firebase/firestore";
import {notionCloneFirestore} from "../index";

export type DocumentCollection = {
    id: string;
    title: string;
    data: JSON | null;
    bannerUrl: string;
}

export const saveDocument = async (data: DocumentCollection) => {
    await setDoc(doc(notionCloneFirestore, "document", data.id), data);
}

export const deleteDocument = async (dataId: string) => {
  await deleteDoc(doc(notionCloneFirestore, "document", dataId));
}
