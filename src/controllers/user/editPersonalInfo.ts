import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';
import type { UserRequest } from '../../types/user';

export default async function editPersonalInfo(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        const personalData: UserRequest = await c.req.json();
        const { firstName, lastName, dob, gender, token } = personalData;
        const response = await fsdb.collection("users").doc(uid).update({
            firstName,
            lastName,
            dob,
            gender,
            token,
            verify: true,
        });
        if (!response) {
            return c.json({ message: 'Failed to update user information' }, 500);
        }
        return c.json({ message: "Update user information success" }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}