import 'dotenv/config';
import type { Config } from '@netlify/functions';
import { checkAuthorized } from '../src/requests.js';
import { requestLogin } from '../src/login.js';
import { fetchDatabaseCookie } from '../src/firebase.js';
import { Cookie } from '../src/utils.js';
import axios from 'axios';

// precisa vir com Content-Type: application/json
export default async function handler(req: Request) {
  const resp = await checkAuthorized(req);
  if (resp !== 'ok') return resp;
  let cookie = await fetchDatabaseCookie();
  if (!(await isCookieStillValid(cookie))) cookie = await requestLogin();
  return new Response(JSON.stringify(cookie));
}

async function isCookieStillValid(cookie: Cookie) {
  const resp = await axios.get(
    'https://grancursosonline.com.br/identificacao/',
    {
      headers: {
        cookie: `${cookie.name}=${cookie.value}`,
      },
    },
  );
  const html = resp.data as string;
  return html.includes('REMIX_APP_CLIENT_KEY');
}

export const config: Config = {
  path: '/',
};
