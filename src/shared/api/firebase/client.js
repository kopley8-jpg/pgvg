import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from '@shared/api/firebase/config';

const app = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseConfig);
const analytics = getAnalytics(app);
