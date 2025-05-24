import type { Context } from 'hono'
import { db } from '../../utils/firestore';

export default async function deleteHistory(c: Context) {
    try {
        const historyId: string = c.req.param('historyId') || '';
        const response = await db.collection('history').doc(historyId).delete();
        if (!response) {
            return c.json({ message: 'Failed to delete history' }, 500);
        }
        return c.json({ message: "History delete success" }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}