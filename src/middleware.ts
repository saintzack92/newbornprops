import { NextResponse } from "next/server";

function getCookieValue(cookieString:any, cookieName:any) {
  const name = `${cookieName}=`;
  const ca = decodeURIComponent(cookieString ?? '').split(';');
  for (let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

async function refreshToken(request:any) {
  const refreshToken = getCookieValue(request.headers.get('cookie'), 'refresh_token');
  if (!refreshToken) return null;

  try {
    const response = await fetch(`http://localhost:3000/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) throw new Error('Failed to refresh token');
    return await response.json();
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

export async function middleware(request:any) {
  const accessToken = getCookieValue(request.headers.get('cookie'), 'access_token');
  const url = request.nextUrl.clone();

  if (!accessToken && !url.pathname.startsWith('/login')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (accessToken) {
    try {
      const validationResponse = await fetch(`http://localhost:3000/auth/status`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: 'include',
      });

      if (validationResponse.ok) {
        return NextResponse.next();
      } else if (validationResponse.status === 401) {
        const newTokens = await refreshToken(request);
        if (newTokens && newTokens.access_token) {
          const response = NextResponse.next();
          response.cookies.set('access_token', newTokens.access_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
          if (newTokens.refresh_token) {
            response.cookies.set('refresh_token', newTokens.refresh_token, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
          }
          return response;
        }
      }
    } catch (error) {
      console.error('Middleware error:', error);
    }
    // Redirect to login if refresh fails or any other issue
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Default action for other cases
  return NextResponse.next();
}

export const config = {
  matcher: ['/adminpanel/:path*', '/login'],
};
