import type { Context } from 'hono';
import { fsdb } from '../../utils/firebase';

import type { FamilyRequest } from '../../types/family';

export default async function editMemberDetail(c: Context) {
    try{
        const memberId: string = c.req.param('memberId') || '';
        const uid: string = c.req.query('uid') || '';
        const familyData: FamilyRequest = await c.req.json();
        const { firstName, lastName, dob, gender } = familyData;
        if (!memberId || !uid) {
            return c.json({ message: 'Member ID and UID are required' }, 400);
        }
        const memberRef = fsdb.collection("family").doc(memberId);
        const existingmemberDoc = await memberRef.get();

        if (!existingmemberDoc.exists) {
            return c.json({ message: 'Member not found' }, 404);
        }
        const existingMemberData = existingmemberDoc.data();
        const ownerUid: string = existingMemberData?.uid;
        if (ownerUid !== uid) {
            return c.json({ message: 'Unauthorized: You do not have permission to edit this member' }, 403);
        }
        const inputDob = new Date(dob);
        const age = new Date().getFullYear() - inputDob.getFullYear();
        await memberRef.update({
            firstName,
            lastName,
            dob: inputDob,
            gender,
            age,
            updatedAt: new Date(),
        });
        return c.json({ message: "Member detail update success" }, 200);
    } catch (error) {
        console.error('Error updating member detail:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}