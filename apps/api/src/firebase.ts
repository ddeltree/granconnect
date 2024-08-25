import 'dotenv/config';
import admin from 'firebase-admin';
import { Cookie } from './utils';

let serviceAccount = process.env.SERVICE_ACCOUNT;
if (serviceAccount === undefined)
  throw Error('SERVICE_ACCOUNT = undefined. O arquivo .env existe?');
serviceAccount = JSON.parse(serviceAccount);

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

export async function verifyUserSession(token: string) {
  try {
    await app.auth().verifyIdToken(token);
    return true;
  } catch (e) {}
  return false;
}

export async function isEnabledUserId(uid: string) {
  const document = await app.firestore().doc('admin/users').get();
  if (!document.exists) return false;
  const data = document.data();
  if (data === undefined) return false;
  const arrayEnabledUID: string[] = data.arrayEnabledUID ?? [];
  return arrayEnabledUID.includes(uid);
}

export async function fetchDatabaseCookie() {
  const document = await app.firestore().doc('admin/cookie').get();
  if (!document.exists) return null;
  return document.data() as Cookie;
}

export async function storeSession(cookie: Cookie) {
  await app.firestore().doc('admin/cookie').set(cookie);
}
