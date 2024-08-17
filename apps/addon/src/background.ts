import browser from 'webextension-polyfill';
import { auth } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import { ForbiddenError, fetchAuthorizedSession } from '../lib/session';

browser.runtime.onInstalled.addListener(async () => {
  browser.runtime.openOptionsPage();
  await signInAnonymously(auth);
  try {
    await fetchAuthorizedSession();
  } catch (e) {
    if (!(e instanceof ForbiddenError)) throw e;
  }
});
browser.action.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});
browser.runtime.onStartup.addListener(fetchAuthorizedSession);
