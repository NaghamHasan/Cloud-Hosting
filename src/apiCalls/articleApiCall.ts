import { Article } from "@/generated/prisma";
import { Domain } from "@/utils/constance";
import { ArticleWithComments } from "@/utils/types";

// get articles by pageNumber
export const getArticles = async (
  pageNumber: string | undefined,
): Promise<Article[]> => {
  try{
  const response = await fetch(
    `${Domain}/api/articles?pageNumber=${pageNumber}`,{cache:"no-store"},
  );

  if (!response.ok) {
    const errorData = await response.json().catch(()=>({}));
    throw new Error(errorData.message || `Faild to fetch articles: ${response.status}`);
  }

  return await response.json();
}catch(error:any){
  console.log("Error in get articles:",error);
  throw new Error(error.message||"An Arror Accurred")
}
};

// get articles count
export const getArticlesCount = async (): Promise<number> => {
  const response = await fetch(`${Domain}/api/articles/count`);
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
      `${Domain}/api/articles/search?searchText=${searchText}`,
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
  const response = await fetch(`${Domain}/api/articles/${articleId}`);
  if (!response.ok) {
    throw new Error("Error from Article info page");
  }
  return await response.json();
};
