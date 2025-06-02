import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
interface JWTPayload { exp?: number }
//middleware function to be linked to each route at the bottom
//checks for the token within the NextRequets object, and provides access to routes accordingly
export async function middleware(request: NextRequest) {

    //checks the request for the access-token's specific value by accessing the request's cookies.get('token').value
    //if the token is not found, the the user is re-routed to the login
    //(realistically, using the token's returned data, you should check if the token has expired as well)
    const token = request.cookies.get('token')?.value;
    console.log('token', token)
    if (!token) {
        if ((request.nextUrl.pathname != "/example") && (request.nextUrl.pathname != "/example/forgotpass")) {
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
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}