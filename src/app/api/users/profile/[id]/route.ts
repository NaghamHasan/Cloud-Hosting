import { prisma } from "@/utils/db";
import { IdParamsFromApi } from "@/utils/interfaces";
import { NextRequest, NextResponse } from "next/server";
import { VerifyToken } from "@/utils/verifyToken";
import { UpdateProfileDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { UpdateUserSchema } from "@/utils/validation";

/**
 * @methode DELETE
 * @route ~/api/profile/:id
 * @desc delete account
 * @access private
 */

export async function DELETE(
  request: NextRequest,
  { params }: IdParamsFromApi
) {
  try {
    // find user from db (id for delete from client)
    const userId = parseInt((await params).id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        comments: true
      }
    });
    // user not found
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    // get id from token
    const tokenPayload = VerifyToken(request);
    // id from token equal id from request (this person wont to delete his account)
    if(tokenPayload !== null && tokenPayload.id === userId) {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      // delete comments for this user
      const commentIds = user.comments.map(comment => comment.id);
      await prisma.comment.deleteMany({
        where: {
          id: {
            in: commentIds
          }
        }
      })
      // deleted
      return NextResponse.json(
        { message: "Your account deleted succsusfuly" },
        { status: 200 }
      );
    }
    // id from token desont equal id from request (this person wont to delete account not have it)
    return NextResponse.json(
      { message: "You can only delete your accont" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/**
 * @methode GET
 * @route ~/api/profile/:id
 * @desc get profile information
 * @access private
 */

export async function GET(request: NextRequest, { params }: IdParamsFromApi) {
  try {
    const id = parseInt((await params).id);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const payload = VerifyToken(request);
    if (payload !== null && payload.id !== id) {
      return NextResponse.json(
        { message: "you can only get your profile information,access denied" },
        { status: 403 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/**
 * @methode PUT
 * @route ~/api/profile/:id
 * @desc edit profile information
 * @access private
 */

export async function PUT(request: NextRequest, { params }: IdParamsFromApi) {
  try {
    const id = parseInt((await params).id);
    const userFromdb = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if(!userFromdb) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const payload = VerifyToken(request);
    if (payload !== null && payload.id !== id) {
      return NextResponse.json(
        { message: "you dont allowed to edit this information,access denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as UpdateProfileDto;
    const validation = UpdateUserSchema.safeParse(body);
    if(!validation.success){
      return NextResponse.json({message: "invalid information"},{status: 400})
    }
    if(body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password as string, salt);
    }
    if (body.email) {
      const emailIsExist = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (emailIsExist) {
        return NextResponse.json(
          { message: "Email is already exist" },
          { status: 500 }
        );
      }
    }
    const userAfterUpdate = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });
    return NextResponse.json(
      { message: "updated succesfuly", userAfterUpdate },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
