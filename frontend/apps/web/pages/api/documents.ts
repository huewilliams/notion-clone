import {NextApiRequest, NextApiResponse} from "next";
import {getDocs, query, collection} from "firebase/firestore";
import {notionCloneFirestore} from "../../firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const q = query(collection(notionCloneFirestore, "document"));
        const querySnapshot = await getDocs(q);
        res.status(200).json(querySnapshot.docs.map(doc => doc.data()))
        return;
    }
    res.status(200).json({
        hello: 'world'
    });
}
