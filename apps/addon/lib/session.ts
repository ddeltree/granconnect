import browser from 'webextension-polyfill';
import { auth } from '../src/firebase';

export async function fetchAuthorizedSession() {
  if (await isSessionApplied()) return;
  await auth.authStateReady();
  const user = auth.currentUser;
  if (user === null) throw new Error('no user loaded');
  const payload = { token: await user.getIdToken(), uid: user.uid };

  const cookie = await fetchSession(payload);
  await browser.cookies.set(cookie);
  if (!(await isSessionApplied())) console.log('Usuário sem acesso');
}

async function fetchSession(
  payload: Record<'token' | 'uid', string>,
): Promise<SessionCookie> {
  const API_URL = import.meta.env.VITE_API_URL;
  if (API_URL === undefined)
    throw Error('URL da API = undefined. O arquivo .env existe?');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  switch (response.status) {
    case 401:
      throw new UnauthorizedError();
    case 403:
      throw new ForbiddenError();
    case 200:
      return await response.json();
    default:
      throw new Error(await response.text());
  }
}

async function isSessionApplied() {
  const response = await fetch('https://grancursosonline.com.br/identificacao');
  return !response.url.includes('identificacao');
}

type SessionCookie = {
  name: 'grancursosonline';
  value: string;
  url: 'https://grancursosonline.com.br';
  domain: '.grancursosonline.com.br';
  path: '/';
  secure: true;
  httpOnly: true;
};

export class UnauthorizedError extends Error {
  constructor() {
    super('Email ou senha incorretos');
  }
}
export class ForbiddenError extends Error {
  constructor() {
    super('Usuário sem permissões de acesso');
  }
}
