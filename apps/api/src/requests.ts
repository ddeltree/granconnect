import {
  isEnabledUserId,
  verifyUserSession as verifyUser,
} from '../src/firebase.js';

export async function checkAuthorized(req: Request) {
  if (req.method !== 'POST')
    return new Response('Unsupported method', { status: 400 });
  const data = await parseBody(req);
  if (data === null)
    return new Response('Invalid JSON format', { status: 400 });
  const { token, uid } = data;
  const [isVerifiedUser, isEnabledUser] = [
    await verifyUser(token),
    await isEnabledUserId(uid),
  ];
  if (!isVerifiedUser) {
    return new Response(
      `Unauthorized ${JSON.stringify({
        token,
        uid,
        isVerifiedUser,
        isEnabledUser,
      })}`,
      {
        status: 401,
      },
    );
  }
  if (!isEnabledUser) {
    return new Response(
      `Forbidden ${JSON.stringify({
        token,
        uid,
        isVerifiedUser,
        isEnabledUser,
      })}`,
      {
        status: 403,
      },
    );
  }
  return 'ok';
}

export async function parseBody(req: Request) {
  try {
    return (await req.json()) as Record<'token' | 'uid', string>;
  } catch {
    return null;
  }
}
