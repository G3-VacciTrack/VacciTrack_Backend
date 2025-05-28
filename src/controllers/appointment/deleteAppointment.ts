import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function deleteAppointment(c: Context) {
    try {
        const appointmentId: string = c.req.param('appointmentId') || '';
        const response = await fsdb.collection('appointment').doc(appointmentId).delete();
        if (!response) {
            return c.json({ message: 'Failed to delete appointment' }, 500);
        }
        return c.json({ message: "Appointment delete success" }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}