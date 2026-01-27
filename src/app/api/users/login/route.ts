import { prisma } from "@/utils/db";
import { LoginDto } from "@/utils/dtos";
import { SetCookie } from "@/utils/generateToken";
import { LoginSchema } from "@/utils/validation";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/users/login
 * @desc Login User
 * @access public
 */

export async function POST(request:NextRequest){
    try {
        // Get data from user
        const body = await request.json() as LoginDto;
        // Ensure data is correct
        const validation = LoginSchema.safeParse(body);
        // data not correct
        if(!validation.success){
            return NextResponse.json({message: "invalid information"},{status: 400})
        }
        // data correct && ensure user is exist in database
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        });
        // user not exist
        if(!user){
            return NextResponse.json({message: "invalid email or password"},{status: 400})
        }
        // user exist && ensure password
        const TruePassword = await bcrypt.compare(body.password,user.password);
        // error password
        if(!TruePassword){
            return NextResponse.json({message: "invalid email or password"},{status: 400})
        }
        // true password && generate token && set cookie
        const cookie = SetCookie({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        });
        // success
        return NextResponse.json({message: "Authenticated"},{
            status: 200,
            headers: {
                "Set-Cookie": cookie
            }
        })
    } catch (error) {
        return NextResponse.json({message: error},{status: 500})
    }
}