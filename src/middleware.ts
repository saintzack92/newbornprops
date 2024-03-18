// import { NextResponse } from "next/server";


// function getCookieValue(cookieString:any, cookieName:any) {
//   const name = cookieName + "=";
//   const decodedCookie = decodeURIComponent(cookieString);
//   const ca = decodedCookie.split(';');
//   for(let i = 0; i <ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// export async function middleware(request:any) {
//   const cookieHeader = request.headers.get('cookie') || '';

//   // Extract the access_token from the cookieHeader
//   const accessToken = getCookieValue(cookieHeader, 'access_token');
//   // console.log(accessToken);
  
  
  
//   // Check if access_token is not empty
//   if (accessToken) {
//       // Make a request to the backend validation endpoint with the Authorization header
//       const validationResponse = await fetch(`http://localhost:3000/auth/status`, {
//           headers: {
//               'Authorization': `Bearer ${accessToken}`,
//           },
//       });

//       if (!validationResponse.ok && !request.nextUrl.pathname.startsWith('/login')) {
//           return NextResponse.redirect(new URL('/login', request.url));
//       } else if (validationResponse.ok && request.nextUrl.pathname === '/login') {
//           return NextResponse.redirect(new URL('/adminpanel/dashboard', request.url));
//       }
//   } else if (!request.nextUrl.pathname.startsWith('/login')) {
//       // If there's no access_token and trying to access a protected route, redirect to login
//       return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//     matcher: ["/adminpanel/:path*", "/login"],
// };
import { NextResponse } from "next/server";
import { setToken } from "./app/lib/authToken";

function getCookieValue(cookieString:any, cookieName:any) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(cookieString);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

async function refreshToken(request:any) {
  const refreshToken = getCookieValue(request.headers.get('cookie'), 'refresh_token');
  if (!refreshToken) return null;

  const response = await fetch(`http://localhost:3000/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  console.log(JSON.stringify(response,null,4));
  console.log(refreshToken,'refresh token function in middleware');
  

  if (!response.ok) return null;
  return await response.json();
}

export async function middleware(request:any) {
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
