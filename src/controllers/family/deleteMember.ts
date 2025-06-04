import type { Context } from 'hono';
import { fsdb } from '../../utils/firebase';

export default async function deleteMember(c: Context) {
    try {
        const memberId: string = c.req.param('memberId') || '';
        const uid: string = c.req.query('uid') || '';
        if (!memberId || !uid) {
            return c.json({ message: 'Member ID and UID are required' }, 400);
        }

        const memberRef = fsdb.collection("family").doc(memberId);
        const existingMemberDoc = await memberRef.get();

        if (!existingMemberDoc.exists) {
            return c.json({ message: 'Member not found' }, 404);
        }

        const existingMemberData = existingMemberDoc.data();
        const ownerUid: string = existingMemberData?.uid;

        if (ownerUid !== uid) {
            return c.json({ message: 'Unauthorized: You do not have permission to delete this member' }, 403);
        }

        const memberName = existingMemberData?.firstName + ' ' + existingMemberData?.lastName;

        await memberRef.delete();

        const appointmentQuery = fsdb.collection("appointment").where("memberName", "==", memberName);
        const appointmentSnapshot = await appointmentQuery.get();
        const batch = fsdb.batch();
        appointmentSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        const historyQuery = fsdb.collection("history").where("memberName", "==", memberName);
        const historySnapshot = await historyQuery.get();
        const historyBatch = fsdb.batch();
        historySnapshot.forEach(doc => {
            historyBatch.delete(doc.ref);
        });
        await historyBatch.commit();
       
        return c.json({ message: "Member deleted successfully" }, 200);
    } catch (error) {
        console.error('Error deleting member:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}