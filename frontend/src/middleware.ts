import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('token')?.value;
    console.log('token', token)
    if (!token) {
        if ((request.nextUrl.pathname != "/example") && (request.nextUrl.pathname != "/example/forgotpass") && (request.nextUrl.pathname != "/example/signup")) {
            return NextResponse.redirect(new URL("/example", request.url));
        }
    }
    else if (token) {
        if (request.nextUrl.pathname == "/example") {
            return NextResponse.redirect(new URL('/example/protectedroute', request.url));
        }
        else {
            return NextResponse.next();
        }
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}