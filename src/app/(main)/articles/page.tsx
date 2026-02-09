export const dynamic = "force-dynamic";

import ArticleComponent from "@/app/components/Articles/article";
import Link from "next/link";
import SearchBar from "@/app/components/Articles/searchBar";
import Pagination from "@/app/components/Articles/pagination";
import { Article } from "@/generated/prisma";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import { ARTICLES_PER_PAGE } from "@/utils/constance";

interface Params {
  searchParams: Promise<{
    pageNumber: string;
  }>;
}

const Articles = async ({ searchParams }: Params) => {
  const pageNumber = (await searchParams).pageNumber;
  const articles: Article[] = await getArticles(pageNumber);
  const count: number = await getArticlesCount();
  const pages: number = Math.ceil(count / ARTICLES_PER_PAGE);
  return (
    <div className="flex relative justify-center">
      <div className="container flex flex-col">
        <SearchBar />
        <section className="flex flex-grow items-center justify-center">
          {articles.length === 0 ? (
            <div className="main-text-color font-bold text-3xl">
              No Articles exists
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full px-4 md:px-10">
              {articles.map((el, key) => (
                <Link href={`articles/${el.id}`} key={key}>
                  <ArticleComponent article={el} />
                </Link>
              ))}
            </div>
          )}
        </section>
        <Pagination
          pageNumber={parseInt(pageNumber)}
          route="/articles"
          pages={pages}
        />
      </div>
    </div>
  );
};

export default Articles;
