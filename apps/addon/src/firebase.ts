import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCSVGQdGzW_Iq71i-mDr28twB12gibXvnI',
  authDomain: 'grancursos-f35f4.firebaseapp.com',
  projectId: 'grancursos-f35f4',
  storageBucket: 'grancursos-f35f4.appspot.com',
  messagingSenderId: '576888246744',
  appId: '1:576888246744:web:87f2a5f857f3ed0bd122ad',
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
