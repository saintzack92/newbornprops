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
function decodeJwt(token:any) {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}
// Attempts to refresh the access token
async function refreshToken(request:any) {
  try {
    const response = await fetch(`http://localhost:3000/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // Sends cookies along with the request
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('response status : ', response.status);
    

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

  // Decode the JWT to check for expiration
  const decodedToken = decodeJwt(accessToken);
  const isTokenExpired = decodedToken ? Date.now() >= decodedToken.exp * 1000 : true;

  // If the token is missing or expired, and not accessing /login, try to refresh
  if ((isTokenExpired || !accessToken) && url.pathname !== '/login') {
    const refreshed = await refreshToken(request);
    if (!refreshed) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // If there's an accessToken (not expired), or accessing /login, proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/adminpanel/:path*', '/login'],
};
