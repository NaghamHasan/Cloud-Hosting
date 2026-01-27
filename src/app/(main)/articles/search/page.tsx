import { GetArticlesBySearchText } from "@/apiCalls/articleApiCall";
import ArticleComponent from "@/app/components/Articles/article";
import { Article } from "@/generated/prisma";
import Link from "next/link";

interface SearchPageParams {
  searchParams: Promise<{
    searchText: string;
  }>;
}

const SearchPage = async ({ searchParams }: SearchPageParams) => {
  const text = (await searchParams).searchText;
  const articles = (await GetArticlesBySearchText(text)) as Article[];
  console.log(text);
  return (
    <div className="flex justify-center mt-9">
      <div className="container">
        <h1 className="text-2xl font-bold text-center main-text-color my-10">Resault for <span className="special-text">{text ? text : "empty"}</span></h1>
            {articles.length === 0 ? (
              <div className="text-center w-full text-3xl font-bold text-[#193d4b]">
                Not found
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {articles.map((article, key) => (
                  <Link href={`${article.id}`} key={key}>
                    <ArticleComponent article={article} />
                  </Link>
                ))}
              </div>
            )}
      </div>
    </div>
  );
};

export default SearchPage;
