import { prisma } from "@/utils/db";
import { EditCommentDto } from "@/utils/dtos";
import { IdParamsFromApi } from "@/utils/interfaces";
import { VerifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @methode DELETE
 * @route ~/api/comments/:id
 * @desc delete comment
 * @access private
 */

export async function DELETE(request: NextRequest,{params}: IdParamsFromApi){
    try{
        const commentId = parseInt((await params).id);
        const userFromToken = VerifyToken(request);
        if(!userFromToken){
            return NextResponse.json({message: "you are didn't login,access denied"},{status: 401})
        }
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            }
        });
        if(!comment){
            return NextResponse.json({message: "comment not exist"},{status: 404})
        }
        if(userFromToken.isAdmin || comment.userId === userFromToken.id){
            await prisma.comment.delete({
            where: {
                id: commentId
            }
        });
        return NextResponse.json({message: "Comment deleted successfuly"})
        }
        return NextResponse.json({message: "you can delete your comments only,access denied"},{status: 403})
    }catch(error){
        return NextResponse.json({message: "internal server error", error},{status: 500})
    }
}

/**
 * @methode PUT
 * @route ~/api/comments/:id
 * @desc edit comment
 * @access private
 */

export async function PUT(request: NextRequest,{params}: IdParamsFromApi){
    try{
        const commentId = parseInt((await params).id);
        const userFromToken = VerifyToken(request);
        if(!userFromToken){
            return NextResponse.json({message: "you are didn't login,access denied"},{status: 401})
        }
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            }
        });
        if(!comment){
            return NextResponse.json({message: "comment not exist"},{status: 404})
        }
        if(comment.userId !== userFromToken.id){
            return NextResponse.json({message: "you didnt allow to edit this information,access denied"},{status: 403})
        }
        const body = await request.json() as EditCommentDto;
        if(!body.text){
            return NextResponse.json({message:"this field is required"},{status: 400})
        }
        const commentAfterUpdate = await prisma.comment.update({
            where: {
                id: commentId
            },
            data: {
                text: body.text,
            }
        });
        return NextResponse.json(commentAfterUpdate,{status: 200})
    }catch(error){
        return NextResponse.json({message: "internal server error", error},{status: 500})
    }
}