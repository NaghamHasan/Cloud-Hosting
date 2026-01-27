import jwt from "jsonwebtoken"
import { JwtPaload } from "./types";
import { serialize } from "cookie";

export function GenerateToken(payLoad: JwtPaload) : string{
        const token = jwt.sign(payLoad,process.env.SECRET_KEY as string,{
      expiresIn: "30d"
    });
    return token;
}

export function SetCookie(payLoad: JwtPaload): string{
  const token = GenerateToken(payLoad);
  const cookie = serialize("token",token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60*60*24*30
  });
  return cookie;
}