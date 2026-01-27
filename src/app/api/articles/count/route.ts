import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

/**
 * @methode GET
 * @route ~/api/count
 * @desc get article count
 * @access public
 */

export async function GET(){
    try{
        const count = await prisma.article.count();
        return NextResponse.json({count},{status: 200});
    }catch(error){
        return NextResponse.json({message: "Internal server error",error},{status: 500})
    }
}