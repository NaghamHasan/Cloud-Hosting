import { UpdateArticleDto } from "@/utils/dtos";
import { IdParamsFromApi } from "@/utils/interfaces";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import { VerifyToken } from "@/utils/verifyToken";

/**
 * @method GET
 * @Route ~/api/articles/:id
 * @desc Get article by id with comments
 * @access public
 */

export async function GET(request: NextRequest, { params }: IdParamsFromApi) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt((await params).id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "Article not exist" },
        { status: 404 }
      );
    }
    return NextResponse.json(article, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

/**
 * @method PUT
 * @Route ~/api/articles/:id
 * @desc Edit article
 * @access private (only admin)
 */
export async function PUT(request: NextRequest, { params }: IdParamsFromApi) {
  try {
    const userFromToken = VerifyToken(request);
    if (!userFromToken?.isAdmin) {
      return NextResponse.json(
        { message: "only admin can edit article,access denied" },
        { status: 403 }
      );
    }
    // get article
    const article = await prisma.article.findUnique({
      where: { id: parseInt((await params).id) },
    });
    // article not exist
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    // take data from user
    const body = (await request.json()) as UpdateArticleDto;
    // update article
    const articleAfterUpdate = await prisma.article.update({
      where: article,
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(articleAfterUpdate, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

/**
 * @method DELETE
 * @Route ~/api/articles/:id
 * @desc Delete article
 * @access private (only admin)
 */
export async function DELETE(
  request: NextRequest,
  { params }: IdParamsFromApi
) {
  try {
    const userFromToken = VerifyToken(request);
    if (!userFromToken?.isAdmin) {
      return NextResponse.json(
        { message: "only admin can delete article,access denied" },
        { status: 403 }
      );
    }
    // find article
    const article = await prisma.article.findUnique({
      where: { id: parseInt((await params).id) },
      include: {
        comments: true
      }
    });
    // if article not exist
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    // delete article
    await prisma.article.delete({ where:{
      id: article.id
    } });
    // delete comments for article
    const commentIds = article.comments.map(comment => comment.id);
    await prisma.comment.deleteMany({
      where: {
        id: {
          in: commentIds
        }
      }
    })
    // done
    return NextResponse.json({ message: "deleted done" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
