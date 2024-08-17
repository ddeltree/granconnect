import { storeSession } from './firebase';
import { parse } from 'node-html-parser';
import { parseCookieHeaders } from './utils';

const payload = {
  email: process.env.EMAIL!,
  senha: process.env.SENHA!,
  'csrf-token': await getCSRFToken(),
  'action-url-retorno': 'undefined',
};

export async function requestLogin() {
  const cookieHeaders = await fetchNewSession();
  const cookie = parseCookieHeaders(cookieHeaders);
  await storeSession(cookie);
  return cookie;
}

async function fetchNewSession() {
  const resp = await fetch(ROUTES.LOGIN, {
    method: 'POST',
    body: new URLSearchParams(payload).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  const status = ((await resp.json()) as any)['status'] as 'Sucesso' | 'erro';
  if (status !== 'Sucesso') throw new Error(JSON.stringify(payload));
  return resp.headers.getSetCookie();
}

const ROUTES = {
  CSRF_TOKEN: 'https://www.grancursosonline.com.br/identificacao',
  LOGIN: 'https://www.grancursosonline.com.br/identificacao/login',
};

async function getCSRFToken() {
  const resp = await fetch('https://www.grancursosonline.com.br/identificacao');
  const el = parse(await resp.text());
  return el
    .querySelector('#identificacao-login .csrf-token')
    ?.getAttribute('value')!;
}
