import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function getAppointmentById(c: Context) {
    try {
        const appointmentId: string = c.req.param('appointmentId') || '';
        const response = await fsdb.collection("appointment").doc(appointmentId).get();
        if (!response.exists) {
            return c.json({ message: 'No history found' }, 404);
        }
        const appointmentData = response.data();
        return c.json({ appointment: appointmentData }, 200);
    } catch (error) {
        console.error('Error fetching :', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}