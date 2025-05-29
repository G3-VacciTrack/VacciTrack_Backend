import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function getAppointment(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        const response = await fsdb.collection("appointment").where("uid", "==", uid).get();
        if (response.empty) {
            return c.json({ message: 'No appointment found' }, 404);
        }
        const appointmentData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return c.json({ appointment: appointmentData }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}