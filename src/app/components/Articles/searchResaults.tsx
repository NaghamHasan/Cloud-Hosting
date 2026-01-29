import { GetArticlesBySearchText } from "@/apiCalls/articleApiCall";
import { Article } from "@/generated/prisma";
import Link from "next/link";
import ArticleComponent from "./article";

// 1. مكون صغير لجلب البيانات (Data Fetching Component)
async function SearchResults({ query }: { query: string }) {
    const articles = await GetArticlesBySearchText(query) as Article[];

    if (articles.length === 0) {
        return <div className="text-center w-full text-3xl font-bold text-[#193d4b]">Not found</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article,key) => (
                <Link key={key} href={`/articles/${article.id}} key={article.id`}>
                    <ArticleComponent article={article} />
                </Link>
            ))}
        </div>
    );
}
export default SearchResults;