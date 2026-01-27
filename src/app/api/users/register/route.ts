import { NextRequest, NextResponse } from "next/server";
import { CreateUserDto } from "@/utils/dtos";
import { prisma } from "@/utils/db";
import { UserSchema } from "@/utils/validation";
import bcrypt from "bcryptjs";
import { SetCookie } from "@/utils/generateToken";

/**
 * @method POST
 * @route ~/api/users/register
 * @desc Create new account
 * @access public
 */

export async function POST(request: NextRequest) {
  try {
    // fetch data from user
    const info = (await request.json()) as CreateUserDto;
    // validate truth info
    const validation = UserSchema.safeParse(info);
    // the information is false
    if (!validation.success) {
      return NextResponse.json(
        { message: "Information not true" },
        { status: 400 }
      );
    }
    // validate email exist
    const user = await prisma.user.findUnique({
      where: {
        email: info.email,
      },
    });
    // email is exist
    if (user) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 400 }
      );
    }
    // email not exist
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(info.password, salt);
    // create new user
    const newUser = await prisma.user.create({
      data: {
        email: info.email,
        username: info.username,
        password: hashPassword,
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });
    // generate token && set cookie
    const cookie = SetCookie({
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    });
    return NextResponse.json(
      { ...newUser },
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
    // error is server
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
