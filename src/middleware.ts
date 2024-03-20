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
  try {
    const response = await fetch(`http://localhost:3000/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // Ensure cookies are included in the request
      headers: { 'Content-Type': 'application/json' },
      // No need to explicitly send the refresh token in the body
    });

    if (!response.ok) throw new Error('Failed to refresh token');
    return await response.json();
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

export async function middleware(request:any) {
  console.log('Middleware invoked for request to:', request.nextUrl.pathname);

  const accessToken = getCookieValue(request.headers.get('cookie'), 'access_token');
  const url = request.nextUrl.clone();

  if (!accessToken && !url.pathname.startsWith('/login')) {
    console.log('Redirecting to login due to missing access token');
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (accessToken) {
    try {
      console.log('Validating access token');
      const validationResponse = await fetch(`${process.env.API_URL}/auth/status`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (validationResponse.ok) {
        console.log('Access token validated successfully');
        return NextResponse.next();
      }

      console.log('Access token validation failed, attempting to refresh');
      const newTokens = await refreshToken(request);
      if (newTokens && newTokens.access_token) {
        console.log('Token refreshed successfully');
        // Continue with setting cookies and returning response
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return new Response('An error occurred.', {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
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
}
