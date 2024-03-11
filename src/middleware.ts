import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
// import withAuth from 'next-auth/middleware';

// export default withAuth({
//   pages: {
//     ...pagesOptions,
//   },
// });


export function middleware(request:NextRequest){
    const isLogin = true;
    if(!isLogin){
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    
}

export const config ={
    matcher :["/adminpanel/dashboard/:path*"]
}