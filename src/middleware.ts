import { NextResponse } from 'next/server';

// Helper to parse cookies
function getCookieValue(cookieString:any, cookieName:any) {
  const name = `${cookieName}=`;
  const ca = decodeURIComponent(cookieString ?? '').split(';');
  for (let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

// Attempts to refresh the access token
async function refreshToken(request:any) {
  try {
    const response = await fetch(`http://localhost:3000/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // Sends cookies along with the request
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to refresh token');
    // No need to manually set cookies here; if the refresh is successful,
    // the response from your backend should include a Set-Cookie header
    return true;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
}

export async function middleware(request:any) {
  const url = request.nextUrl.clone();
  const cookieString = request.headers.get('cookie');
  const accessToken = getCookieValue(cookieString, 'access_token');

  if (!accessToken && url.pathname !== '/login') {
    // Before redirecting to login, try to refresh the token
    const refreshed = await refreshToken(request);
    if (!refreshed) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    // If the token was successfully refreshed, allow the request to proceed
    return NextResponse.next();
  }

  // If there's an accessToken, or the user is accessing the login page, continue as normal.
  return NextResponse.next();
}

export const config = {
  matcher: ['/adminpanel/:path*', '/login'],
};
