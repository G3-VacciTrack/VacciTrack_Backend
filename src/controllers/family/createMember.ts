import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

import type { FamilyRequest } from '../../types/family';

export default async function createMember(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        if (!uid) return c.json({ message: 'UID is required' }, 400);
        const familyData: FamilyRequest = await c.req.json();
        const { firstName, lastName, dob, gender } = familyData;
        const response = await fsdb.collection("family").add({
            uid,
            firstName,
            lastName,
            dob: new Date(dob),
            gender,
            age: new Date().getFullYear() - new Date(dob).getFullYear(),
            createdAt: new Date(),
        });
        if (!response.id) {
            return c.json({ message: 'Failed to create family members' }, 500);
        }
        return c.json({ message: "Create family members success" }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}