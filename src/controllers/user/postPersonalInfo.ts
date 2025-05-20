import type { Context } from 'hono'
import { db } from '../../services/firestore';

export default async function postPersonalInfo(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        const firstName: string = c.req.query('firstName') || '';
        const lastName: string = c.req.query('lastName') || '';
        const age: number = parseInt(c.req.query('age') || '0', 10);
        const gender: string = c.req.query('gender') || '';
        try {
            await db.collection("users").doc(uid).update({
                firstName,
                lastName,
                age,
                gender,
                verify: true,
            });
            return c.json({ message: "Update user information success"}, 200);
        } catch (e) {
            console.error("Error adding document: ", e);
            return c.json({ message: "Error adding document" }, 500);
        }
    } catch (error) {
        console.error('Error fetching allergens:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}