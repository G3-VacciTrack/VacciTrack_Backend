import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function getUserName(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        const response = await fsdb.collection("users").doc(uid).get();
        if (response.exists) {
            const firstName: string = response.data()?.firstName;
            return c.json({ name: firstName || '' }, 200);
        }
        return c.json({ message: 'No user found' }, 404);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}