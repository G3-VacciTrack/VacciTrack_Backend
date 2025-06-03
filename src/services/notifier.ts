import { getMessaging } from 'firebase-admin/messaging';

export async function sendNotification(token: string, title: string, body: string) {
  const messaging = getMessaging();

  const message = {
    token,
    notification: {
      title,
      body,
    },
  };
  try {
    await messaging.send(message);
    console.log(`Sent to ${token}`);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
