import type { Context } from 'hono'
import { db } from '../../utils/firestore';

export default async function getPersonalInfo(c: Context) {
    try {

    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}