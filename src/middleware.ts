import { NextResponse } from "next/server";
import { setToken } from "./app/lib/authToken";
import { useEffect } from "react";

function getCookieValue(cookieString: any, cookieName: any) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(cookieString);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

async function refreshToken(request: any) {
  const refreshToken = getCookieValue(request.headers.get('cookie'), 'refresh_token');
  if (!refreshToken) return null;

  const response = await fetch(`http://localhost:3000/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  console.log(JSON.stringify(response, null, 4));
  console.log(refreshToken, 'refresh token function in middleware');


  if (!response.ok) return null;
  return await response.json();
}

export async function middleware(request: any) {
  const accessToken = getCookieValue(request.headers.get('cookie'), 'access_token');
  const url = request.nextUrl.clone(); // Clone the URL to modify it

  if (!accessToken && !url.pathname.startsWith('/login')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (accessToken) {
    const validationResponse = await fetch(`http://localhost:3000/auth/status`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });

    if (validationResponse.ok) {
      if (url.pathname === '/login') {
        url.pathname = '/adminpanel/dashboard';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    } else if (validationResponse.status === 401) {
      const newTokens = await refreshToken(request);
      if (newTokens && newTokens.access_token) {
        const response = NextResponse.next();
        response.cookies.set('access_token', newTokens.access_token, { path: '/', httpOnly: true, sameSite: 'strict' });
        setToken(newTokens.data.loginResponse.access_token)
        if (newTokens.refresh_token) response.cookies.set('refresh_token', newTokens.refresh_token, { path: '/', httpOnly: true, sameSite: 'strict' });
        return response; // Proceed with new tokens set
      }
    }
    useEffect(() => {
      const checkLocalStorage = async () => {
        // Assuming you store some key in localStorage as part of your session management
        const isSessionActive = localStorage.getItem("token");
        if (!isSessionActive) {
          // localStorage key not found, implying session should be cleared
          await fetch("/api/clear-session", { method: "POST" });
        }
      };

      checkLocalStorage();
    }, []);
  }

  // Redirect to login if not accessing login page and no valid access token
  if (!url.pathname.startsWith('/login')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminpanel/:path*", "/login"],
};
