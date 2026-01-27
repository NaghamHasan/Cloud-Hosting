import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest){
    const tokenCookie = request.cookies.get("token");
    const token = tokenCookie?.value as string;
    if(!token){
        if(request.nextUrl.pathname.startsWith("/api/users/profile"))
        return NextResponse.json({message: "no token provided , access denided, from middlewre"},{status: 401})
    }else{
        if(request.nextUrl.pathname==="/login" || request.nextUrl.pathname==="/register"){
            return NextResponse.redirect(new URL("/",request.url))
        }
    }
}

export const config = {
    matcher: ["/api/users/profile/:path*","/login","/register"]
}