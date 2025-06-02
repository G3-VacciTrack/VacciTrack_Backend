import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function getAppointment(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        const response = await fsdb.collection("appointment").where("uid", "==", uid).get();
        if (response.empty) {
            return c.json({ message: 'No appointment found' }, 404);
        }
        const now = new Date();
        const appointmentData = response.docs
            .filter(doc => doc.data().date.toDate() >= now)
            .map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    date: data.date,
                    description: data.description,
                    vaccineName: data.vaccineName,
                    location: data.location,
                    dose: data.dose,
                    totalDose: data.totalDose,
                };
            });
        return c.json({ appointment: appointmentData }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}