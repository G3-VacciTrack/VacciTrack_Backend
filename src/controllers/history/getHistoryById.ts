import type { Context } from 'hono'
import { db } from '../../utils/firestore';

export default async function getHistoryById(c: Context) {
    try {
        const historyId: string = c.req.param('historyId') || '';
        const response = await db.collection("history").doc(historyId).get();
        if (!response.exists) {
            return c.json({ message: 'No history found' }, 404);
        }
        const historyData = response.data();
        return c.json({ history: historyData }, 200);
    } catch (error) {
        console.error('Error fetching :', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}