import { VerifyToken } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import {NextRequest, NextResponse } from "next/server";


/**
 * @method GET
 * @route ~/api/users/logout
 * @desc Logout User
 * @access public
 */

export async function GET(request: NextRequest){
    try{
        const userFromToken = VerifyToken(request);
        if(!userFromToken){
            return NextResponse.json({message: "you dont loged in"},{status: 401})
        }
        (await cookies()).delete("token");
        return NextResponse.json({message: "logout"},{status: 200})
    }catch(error){
        return NextResponse.json({message: error,
            status: 500,
        })
    }
}