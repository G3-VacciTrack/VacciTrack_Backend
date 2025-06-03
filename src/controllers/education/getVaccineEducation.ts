import type { Context } from 'hono'
import { rtdb } from '../../utils/firebase';

import type { EducationResponse } from '../../types/education';

export default async function getVaccineEducation(c: Context) {
    try {
        const snapshot = await rtdb.ref('vaccineInformation').once('value');
        const data = snapshot.val();
        if (!data) {
            return c.json({ education: [], message: 'No education found' }, 200);
        }
        const educationData: EducationResponse[] = data;
        return c.json({ education: educationData }, 200);
    } catch (error) {
        console.error('Error fetching allergens:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}
