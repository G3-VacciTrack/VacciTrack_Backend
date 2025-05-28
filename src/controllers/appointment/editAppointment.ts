import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function editAppointment(c: Context) {
    try {
        const appointmentId: string = c.req.param('appointmentId') || '';
        const appointmentData = await c.req.json();
        const { date, description, vaccineName, dose, location } = appointmentData;
        const inputDate = new Date(date);
        const dateBeforeNoon = new Date(
            inputDate.getFullYear(),
            inputDate.getMonth(),
            inputDate.getDate() - 1,
            12,
            0,
            0,
            0
        );
        const alertDate = new Date(inputDate.getTime() - 60 * 60 * 1000);
        const response = await fsdb.collection("appointment").doc(appointmentId).update({
            date: inputDate,
            alertDate,
            dateBeforeNoon,
            description,
            vaccineName,
            dose,
            location,
            updateAt: new Date(),
        });
        if (!response) {
            return c.json({ message: 'Failed to create appointment' }, 500);
        }
        return c.json({ message: "Appointment update success" }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}