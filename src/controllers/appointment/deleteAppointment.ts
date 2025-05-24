import type { Context } from 'hono'
import { db } from '../../utils/firestore';

export default async function deleteAppointment(c: Context) {
    try {
        const appointmentId: string = c.req.param('appointmentId') || '';
        const response = await db.collection('appointment').doc(appointmentId).delete();
        if (!response) {
            return c.json({ message: 'Failed to delete appointment' }, 500);
        }
        return c.json({ message: "Appointment delete success" }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}