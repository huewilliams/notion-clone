import {NextApiRequest, NextApiResponse} from "next";
import {getDocs, query, collection} from "firebase/firestore";
import {notionCloneFirestore} from "../../firebase";
import {saveDocument} from "../../firebase/collections/documentCollection";
import {nanoid} from "nanoid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const q = query(collection(notionCloneFirestore, "document"));
        const querySnapshot = await getDocs(q);
        res.status(200).json(querySnapshot.docs.map(doc => doc.data()))
        return;
    }

    if (req.method === 'POST') {
        const id = nanoid();
        await saveDocument({
            id,
            title: 'New Page',
            data: null,
            bannerUrl: "/images/santorini.jpg",
        });
        res.status(201).json({id});
        return;
    }

    res.status(200).json({
        hello: 'world'
    });
}
