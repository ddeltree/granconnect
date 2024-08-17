export function parseCookieHeaders(cookieHeaders: string[]) {
  const value = cookieHeaders
    .filter((c) => c.includes('grancursosonline='))[0]
    .split(';')[0]
    .split('=')[1];
  return {
    name: 'grancursosonline',
    value,
    url: 'https://grancursosonline.com.br',
    domain: '.grancursosonline.com.br',
    path: '/',
    secure: true,
    httpOnly: true,
  } as const;
}

export type Cookie = {
  name: 'grancursosonline';
  value: string;
  url: 'https://grancursosonline.com.br';
  domain: '.grancursosonline.com.br';
  path: '/';
  secure: true;
  httpOnly: true;
};
