import type { Context } from 'hono';
import { fsdb } from '../../utils/firebase';

import type { AppointmentRequest } from '../../types/appointment';

export default async function editAppointment(c: Context) {
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

        const appointmentData: AppointmentRequest = await c.req.json();
        const { memberName, date, description, vaccineName, dose, totalDose, location } = appointmentData;

        const inputDate = new Date(date);
        const dateBeforeNoon = new Date(
            inputDate.getFullYear(),
            inputDate.getMonth(),
            inputDate.getDate() - 1,
            12,
            0, 0, 0
        );
        const alertDate = new Date(inputDate.getTime() - 60 * 60 * 1000);
        await appointmentRef.update({
            memberName,
            date: inputDate,
            alertDate,
            dateBeforeNoon,
            description,
            vaccineName,
            dose,
            totalDose,
            location,
            updateAt: new Date(),
        });
        return c.json({ message: "Appointment update success" }, 200);
    } catch (error) {
        console.error('Error updating appointment:', error);
        return c.json({ message: 'Internal server error during appointment update' }, 500);
    }
}
