import { Article, Comment } from "@/generated/prisma";

export type JwtPaload = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export type CommentWithUsername = Comment & { user: { username: string } };
export type ArticleWithComments = Article & {comments: CommentWithUsername[];}
