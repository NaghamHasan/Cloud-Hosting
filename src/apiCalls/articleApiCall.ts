import { Article } from "@/generated/prisma";
import { DOMAIN } from "@/utils/constance";
import { ArticleWithComments } from "@/utils/types";

// get articles by pageNumber
export const getArticles = async (
  pageNumber: string | undefined,
): Promise<Article[]> => {
  const articles = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
  );

  if (!articles.ok) {
    throw new Error("error from articles page");
  }

  return await articles.json();
};

// get articles count
export const getArticlesCount = async (): Promise<number> => {
  const response = await fetch(`${DOMAIN}/api/articles/count`);
  if (!response.ok) {
    throw new Error("error from get aricles count");
  }
  const { count } = (await response.json()) as { count: number };
  return count;
};

// get articles by search text
export const GetArticlesBySearchText = async (
  searchText: string,
): Promise<Article[] | undefined> => {
  try {
    const response = await fetch(
      `${DOMAIN}/api/articles/search?searchText=${searchText}`,
    );
    if (!response.ok) {
      throw new Error("Somthing went wrong");
    }
    const articles = await response.json();
    return articles;
  } catch (err) {
    console.log(err);
  }
};
export const GetSingleArticle = async (
  articleId: string,
): Promise<ArticleWithComments> => {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`);
  if (!response.ok) {
    throw new Error("Error from Article info page");
  }
  return await response.json();
};
// export const GetComments = async () : Promise<Comment[]> => {
//   const response = await fetch(`${DOMAIN}/api/comments`);
//   if(!response.ok){
//     throw new Error("Error with fetch comment")
//   }
//   return await response.json();
// }
