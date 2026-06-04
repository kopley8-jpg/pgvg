import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from '@shared/api/firebase/config';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
