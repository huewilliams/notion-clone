import {setDoc, doc} from "firebase/firestore";
import {notionCloneFirestore} from "../index";

export type DocumentCollection = {
    id: string;
    title: string;
    data: JSON;
}

export const saveDocument = async (data: DocumentCollection) => {
    await setDoc(doc(notionCloneFirestore, "document", data.id), data);
}
