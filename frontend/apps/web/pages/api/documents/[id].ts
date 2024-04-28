import {NextApiRequest, NextApiResponse} from "next";
import {getDocs, query, collection, where} from "firebase/firestore";
import {notionCloneFirestore} from "../../../firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query;

  if (req.method === 'GET') {
    const q = query(collection(notionCloneFirestore, "document"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length < 1) res.status(404).end("Not Found");
    res.status(200).json(querySnapshot.docs[0].data());
    return;
  }

  res.end(`${id}`);
}
