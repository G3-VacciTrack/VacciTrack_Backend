import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function getPersonalInfo(c: Context) {
    try {

    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}