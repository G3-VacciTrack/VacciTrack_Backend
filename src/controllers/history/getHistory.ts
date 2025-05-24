import type { Context } from 'hono'
import { db } from '../../utils/firestore';

export default async function getHistory(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        const response = await db.collection("history").where("uid", "==", uid).get();
        if (response.empty) {
            return c.json({ message: 'No history found' }, 404);
        }
        const historyData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return c.json({ history: historyData }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}