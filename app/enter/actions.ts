'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_COOKIE, computeAccessToken, isCorrectPassword } from '@/lib/access';
import { COPY } from '@/config/copy';

export type GateState = { error: string } | null;

export async function unlock(
  _prev: GateState,
  formData: FormData,
): Promise<GateState> {
  const password = process.env.SITE_PASSWORD;
  if (!password) {
    console.error('SITE_PASSWORD is not set — the gate rejects everything.');
    return { error: COPY.gate.errorUnavailable };
  }

  const attempt = String(formData.get('password') ?? '');
  if (!isCorrectPassword(attempt)) {
    return { error: COPY.gate.errorWrong };
  }

  (await cookies()).set(ACCESS_COOKIE, computeAccessToken(password), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect('/intro');
}
