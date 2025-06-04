import type { Context } from 'hono'

import { fsdb } from '../../utils/firebase';

export default async function getAllMembers(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        if (!uid) {
            return c.json({ message: 'User ID is required' }, 400);
        }
        const response = await fsdb.collection("family").where("uid", "==", uid).get();
        if (response.empty) {
            return c.json({ message: 'No family members found' }, 404);
        }
        const memberData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return c.json({ members: memberData }, 200);
    } catch (error) {
        console.error('Error fetching family members:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}
