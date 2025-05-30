import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
interface JWTPayload { exp?: number }

//middleware function to be linked to each route at the bottom
//checks for the token within the NextRequets object, and provides access to routes accordingly
export async function middleware(request: NextRequest){

//checks the request for the access-token's specific value by accessing the request's cookies.get('token').value
//if the token is not found, the the user is re-routed to the login
//(realistically, using the token's returned data, you should check if the token has expired as well)
    const token = request.cookies.get('token')?.value;
    console.log("all cookies:", Array.from(request.cookies.getAll()));
        if(!token){
            console.log("No token found!");
            return NextResponse.redirect(new URL("/example", request.url));
        }

//else, the intended navigation is allowed
        return NextResponse.next();
}

//definition of the protected route
export const config = {
    matcher: [ '/example/protectedroute/:path*']
};