import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function deleteAppointment(c: Context) {
    try {
        const appointmentId: string = c.req.param('appointmentId') || '';
        const uid: string = c.req.query('uid') || '';

        const appointmentRef = fsdb.collection("appointment").doc(appointmentId);
        const existingAppointmentDoc = await appointmentRef.get();

        if (!existingAppointmentDoc.exists) {
            return c.json({ message: 'Appointment not found' }, 404);
        }

        const existingAppointmentData = existingAppointmentDoc.data();
        const ownerUid: string = existingAppointmentData?.uid;
        if (ownerUid !== uid) {
            return c.json({ message: 'Unauthorized: You do not have permission to edit this appointment' }, 403);
        }

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