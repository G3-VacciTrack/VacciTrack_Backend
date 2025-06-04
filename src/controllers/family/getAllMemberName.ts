import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

import type { NameResponse } from '../../types/family';

export default async function getAllMembersName(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        if (!uid) {
            return c.json({ message: 'User ID is required' }, 400);
        }
        const response = await fsdb.collection("family").where("uid", "==", uid).get();
        if (response.empty) {
            return c.json({ message: 'No family members found' }, 404);
        }
        const memberData: NameResponse[] = response.docs
                    .map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            fullName: data.firstName + ' ' + data.lastName,
                        };
                    });
        const myName = await fsdb.collection("users").doc(uid).get();
        if (!myName.exists) {
            return c.json({ message: 'User not found' }, 404);
        }
        const myNameData = myName.data();
        memberData.unshift({
            id: uid,
            fullName: myNameData?.firstName + ' ' + myNameData?.lastName,
        });
        return c.json({ members: memberData }, 200);
    } catch (error) {
        console.error('Error fetching family members:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}
