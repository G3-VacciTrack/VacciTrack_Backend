import type { Context } from 'hono'
import { db } from '../../utils/firestore';

export default async function createAppointment(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
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
        const response = await db.collection("appointment").add({
            uid,
            date: inputDate,
            alertDate,
            dateBeforeNoon,
            description,
            vaccineName,
            notifiedAleartDate: false,
            notifiedBeforeNoon: false,
            dose,
            location,

            createdAt: new Date(),
        });
        if (!response.id) {
            return c.json({ message: 'Failed to create appointment' }, 500);
        }
        return c.json({ message: "Create appointment success" }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}