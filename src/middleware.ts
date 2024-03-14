import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export function middleware(request:NextRequest){
    const currentUser = request.cookies.get('token')?.value
    //     console.log(currentUser)
    // const isLogin = true;
    // if(!isLogin){
    //     return NextResponse.redirect(new URL("/auth/login", request.url));
    // }

    if (currentUser && !request.nextUrl.pathname.startsWith('/adminpanel/dashboard')) {
        return Response.redirect(new URL('/adminpanel/dashboard', request.url))
      }
     
      if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url))
      }
    
}

export const config ={
    matcher :["/adminpanel/dashboard/:path*"]
}