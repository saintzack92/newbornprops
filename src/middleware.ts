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
  // Retrieve refresh token from cookies
  const cookieHeader = request.headers.get('cookie') || '';
  const refreshToken = getCookieValue(cookieHeader, 'refresh_token');

  // Hit the refresh token endpoint with refresh_token in the body
  const refreshResponse = await fetch(`http://localhost:3000/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  // Return new tokens or null if refresh failed
  if (refreshResponse.ok) {
    const data = await refreshResponse.json();
    return data; // Assuming this returns new access and refresh tokens
  }
  return null;
}


export async function middleware(request:any) {
  const cookieHeader = request.headers.get('cookie') || '';
  const accessToken = getCookieValue(cookieHeader, 'access_token');

  if (accessToken) {
    const validationResponse = await fetch(`http://localhost:3000/auth/status`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // If token is invalid and gets a 401, try to refresh it
    if (validationResponse.status === 401) {
      const newTokens = await refreshToken(request);
      if (newTokens) {
        // Handle setting new tokens in cookies or local storage as appropriate
        // Redirect or allow the request to continue based on your app's flow
      } else {
        // If token refresh failed, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } else if (validationResponse.ok && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/adminpanel/dashboard', request.url));
    }
  } else if (!request.nextUrl.pathname.startsWith('/login')) {
    // If there's no access_token and trying to access a protected route, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminpanel/:path*", "/login"],
};
