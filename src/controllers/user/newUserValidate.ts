import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function newUserValidate(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        const response = await fsdb.collection("users").doc(uid).get();
        if (!response.exists) {
            await fsdb.collection("users").doc(uid).set({
                firstName: '',
                lastName: '',
                age: 0,
                gender: '',
                verify: false,
            });
            return c.json({ status: true }, 200);
        }
        const data = response.data();
        if (data?.verify) {
            return c.json({ status: false }, 200);
        } else {
            return c.json({ status: true }, 200);
        }
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}