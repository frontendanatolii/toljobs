import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const isPublicPage = req.nextUrl.pathname === '/login' ||  req.nextUrl.pathname === '/register';
    const token = req.cookies.get('token')?.value;

    //if there is no token && page is not public redirect to login
    if (!token && !isPublicPage) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    };


    //if there is token && page is public redirect to home
    if (token && isPublicPage) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    return NextResponse.next();
  } catch (error: any) {
    return NextResponse.error()
  }
}

export const config = {
  matcher: ['/', '/login', '/register']
}