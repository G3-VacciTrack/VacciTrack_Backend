import cron from 'node-cron';
import { db } from '../utils/firestore';
import { sendNotification } from './notifier';
import { options } from '../utils/customDate';

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const inFiveMinutes = new Date(now.getTime() + 5 * 60 * 1000);

  try {
    const snapshot = await db.collection('appointment')
      .where('notifiedBeforeNoon', '==', false)
      .get();

    const alertSnapshot = await db.collection('appointment')
      .where('notifiedAlertDate', '==', false)
      .get();

    const allDocs = new Map();

    for (const doc of [...snapshot.docs, ...alertSnapshot.docs]) {
      allDocs.set(doc.id, doc);
    }

    for (const doc of allDocs.values()) {
      const data = doc.data();
      const userId = data.uid;

      const vaccineName = data.vaccineName || 'your vaccine';
      const location = data.location || 'your location';
      const dose = data.dose || 'a dose';

      const dateBeforeNoonDate = data.dateBeforeNoon.toDate();
      const alertDate = data.alertDate.toDate();
      const inputDate = data.date.toDate();

      if (
        !data.notifiedBeforeNoon &&
        dateBeforeNoonDate &&
        dateBeforeNoonDate <= inFiveMinutes &&
        dateBeforeNoonDate > now
      ) {
        const userSnap = await db.collection('users').doc(userId).get();
        const userData = userSnap.data();
        const formattedDate = inputDate.toLocaleString('en-US', options);
        const fcmToken = userData?.token;
        if (fcmToken) {
          await sendNotification(
            fcmToken,
            '⏰ Appointment Reminder',
            `Reminder: Your ${dose} of ${vaccineName} is coming up at ${location} on ${formattedDate}. Don't forget!`
          );
          await doc.ref.update({ notifiedBeforeNoon: true });
        }
      }
      if (
        !data.notifiedAlertDate &&
        alertDate &&
        alertDate <= inFiveMinutes &&
        alertDate > now
      ) {
        const userSnap = await db.collection('users').doc(userId).get();
        const userData = userSnap.data();
        const fcmToken = userData?.token;
        const formattedDate = inputDate.toLocaleString('en-US', options);
        if (fcmToken) {
          await sendNotification(
            fcmToken,
            '📅 Appointment Reminder',
            `Reminder: Your ${dose} of ${vaccineName} is coming up at ${location} on ${formattedDate}. Don't forget!`
          );
          await doc.ref.update({ notifiedAlertDate: true });
        }
      }
    }
    console.log(`Cron run: ${now}`);
  } catch (err) {
    console.error('Cron error:', err);
  }
});