import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const stringConfig = import.meta.env.VITE_FIREBASE_CONFIG;
if (stringConfig === undefined)
  throw Error('VITE_FIREBASE_CONFIG = undefined. O arquivo .env existe?');
const firebaseConfig = JSON.parse(stringConfig);

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
