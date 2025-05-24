import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from '../../firebaseKey.json' assert { type: 'json' };
import type { ServiceAccount } from 'firebase-admin/app';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});


const db = getFirestore();

export { db };
