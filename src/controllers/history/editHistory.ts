import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

import type { HistoryRequest } from '../../types/history';

export default async function editHistory(c: Context) {
    try {
        const historyId: string = c.req.param('historyId') || '';
        const historyData: HistoryRequest = await c.req.json();
        const { date, description, vaccineName, diseaseName, dose, totalDose, location } = historyData;
        const response = await fsdb.collection('history').doc(historyId).update({
            date,
            vaccineName,
            diseaseName,
            description,
            dose,
            totalDose,
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