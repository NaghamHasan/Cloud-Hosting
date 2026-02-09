export const dynamic = "force-dynamic";


import { NextRequest, NextResponse } from "next/server";
import { CreateArticleDto } from "@/utils/dtos";
import { articleSchema } from "@/utils/validation";
import {prisma} from "@/utils/db";
import { Article } from "@/generated/prisma";
import { ARTICLES_PER_PAGE } from "@/utils/constance";
import { VerifyToken } from "@/utils/verifyToken";

/**
 * @method Get 
 * @Route ~/api/articles
 * @desc get articles by page number
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const paginationNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const articles = await prisma.article.findMany({
      skip: ARTICLES_PER_PAGE * (parseInt(paginationNumber) - 1),
      take: ARTICLES_PER_PAGE,
      orderBy: {
        createdAt: "desc"
      }
    });
    // if(articles.length === 0){
    //   return NextResponse.json({message:"Not Found"}, { status: 404 });
    // }
    return NextResponse.json(articles, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

/**
 * @method POST 
 * @Route ~/api/articles
 * @desc create new article
 * @access private (only admin)
 */
export async function POST(request: NextRequest) {
  try {
    const userFromToken = VerifyToken(request);
    if(!userFromToken?.isAdmin){
      return NextResponse.json({message: "only admin can create article,access denied"}, { status: 403 });
    }
    // take article information from user
    const article = (await request.json()) as CreateArticleDto;

    // validate the values true or false
    const validation = articleSchema.safeParse(article);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.message },
        { status: 400 }
      );
    }

    // create new artice and store in db
    const newArticle: Article = await prisma.article.create({
      data: {
        title: article.title,
        description: article.description,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
