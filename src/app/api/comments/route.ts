import { Comment } from "@/generated/prisma";
import { prisma } from "@/utils/db";
import { CreateCommentDto } from "@/utils/dtos";
import { CreateCommentSchema } from "@/utils/validation";
import { VerifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/comments
 * @desc create new comment
 * @access private (only loged in)
 */

export async function POST(request: NextRequest){
    try{
        const userFromToken = VerifyToken(request);
        if(!userFromToken){
            return NextResponse.json({message: "You are no logout, access denied"},{status: 401})
        }
        const body = await request.json() as CreateCommentDto;
        const validation = CreateCommentSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({message: "invalid information"},{status: 400})
        }
        const findArticle = await prisma.article.findUnique({
            where: {
                id: body.articleId,
            }
        });
        if(!findArticle){
            return NextResponse.json({message: "Article not exist"},{status: 404})
        };
        const comment: Comment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: userFromToken.id
            }
        });
        return NextResponse.json({message: "created succesfuly",comment},{status: 201})
    }catch(error){
        return NextResponse.json({message: error},{status: 500})
    }
}

/**
 * @method GET
 * @route ~/api/comments
 * @desc get all comment
 * @access private (only admin)
 */

export async function GET(request: NextRequest){
    try{
        const userFromToken = VerifyToken(request);
        if(!userFromToken?.isAdmin){
            return NextResponse.json({message:"only admin can allowed,access denied"},{status: 403})
        }
        const comments = await prisma.comment.findMany();
        return NextResponse.json(comments,{status: 200})
    }catch(error){
        return NextResponse.json({message: "Internal server error",error},{status: 500})
    }
}