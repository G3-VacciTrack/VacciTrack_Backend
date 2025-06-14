import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

import type { AppointmentRequest } from '../../types/appointment';

export default async function createAppointment(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        if (!uid) return c.json({ message: 'UID is required' }, 400);
        const appointmentData: AppointmentRequest = await c.req.json();
        const { memberName, date, description, vaccineName, diseaseName, dose, totalDose, location } = appointmentData;

        const inputDate: Date = new Date(date);
        const dateBeforeNoon = new Date(
            inputDate.getFullYear(),
            inputDate.getMonth(),
            inputDate.getDate() - 1,
            12,
            0,
            0,
            0
        );
        const alertDate: Date = new Date(inputDate.getTime() - 60 * 60 * 1000);

        const response = await fsdb.collection("appointment").add({
            uid,
            memberName,
            date: inputDate,
            alertDate,
            dateBeforeNoon,
            description,
            vaccineName,
            diseaseName,
            notifiedAlertDate: false,
            notifiedBeforeNoon: false,
            dose,
            totalDose,
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