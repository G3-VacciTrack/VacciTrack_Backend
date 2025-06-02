import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

export default async function editHistory(c: Context) {
    try {
        const historyId: string = c.req.param('historyId') || '';
        const historyData = await c.req.json();
        const { date, description, vaccineName, disease, dose, location } = historyData;
        const response = await fsdb.collection('history').doc(historyId).update({
            date,
            vaccineName,
            disease,
            description,
            dose,
            location,
            updatedAt: new Date(),
        });
        if (!response) {
            return c.json({ message: 'Failed to update history' }, 500);
        }
        return c.json({ message: "History update success" }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}