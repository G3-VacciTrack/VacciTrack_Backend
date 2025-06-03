import type { Context } from 'hono'
import { rtdb } from '../../utils/firebase';

export default async function getAllDisease(c: Context) {
    try {
        const snapshot = await rtdb.ref('disease').once('value');
        const data = snapshot.val();
        if (!data) {
            return c.json({ disease: [], message: 'No disease found' }, 200);
        }
        const diseaseData: String[] = data;
        return c.json({ disease: diseaseData }, 200);
    } catch (error) {
        console.error('Error fetching allergens:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}
