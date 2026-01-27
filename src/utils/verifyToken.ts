import { NextRequest } from "next/server";
import { JwtPaload } from "./types";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

// for api en point
export function VerifyToken(request: NextRequest) : JwtPaload | null{
    try{
        const tokenCookie = request.cookies.get("token");
    if(!tokenCookie){
        return null
    }
    const token = tokenCookie?.value as string;
    const payload = jwt.verify(token,process.env.SECRET_KEY as string) as JwtPaload;

    return payload;
    }catch(error){
        console.log(error);
        return null;
    }
}

// for pages
export async function VerifyTokenPages() : Promise<JwtPaload | null>{
    try{
        const token = (await cookies()).get("token")?.value as string;
    if(!token){
        return null;
    }
    const userInformation : JwtPaload = jwt.verify(token,process.env.SECRET_KEY as string) as JwtPaload;
  return userInformation;
    }catch(err){
        console.log(err)
        return null;
    }
}
