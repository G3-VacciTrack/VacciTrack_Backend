import type { Context } from 'hono'
import { fsdb } from '../../utils/firebase';

import type { HistoryRequest } from '../../types/history';

export default async function createHistory(c: Context) {
    try {
        const uid: string = c.req.query('uid') || '';
        const historyData: HistoryRequest = await c.req.json();
        const { memberName, date, description, vaccineName, diseaseName, dose, totalDose, location } = historyData;
        const response = await fsdb.collection("history").add({
            memberName,
            uid,
            date,
            description,
            vaccineName,
            diseaseName,
            dose,
            totalDose,
            location,
            createdAt: new Date(),
        });
        if (!response.id) {
            return c.json({ message: 'Failed to create history' }, 500);
        }
        return c.json({ message: "Create history success" }, 200);
    } catch (error) {
        console.error('Error fetching:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}