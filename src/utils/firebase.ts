import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getDatabase } from 'firebase-admin/database'; // <-- Import getDatabase

import serviceAccount from '../../firebaseKey.json' assert { type: 'json' };
import type { ServiceAccount } from 'firebase-admin/app';

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://vaccitrack-7d5a4-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const fsdb = getFirestore(app);
const rtdb = getDatabase(app);
export { fsdb, rtdb };
