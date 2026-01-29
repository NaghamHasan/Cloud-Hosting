export const dynamic = "force-dynamic";

import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import Pagination from "@/app/components/Articles/pagination";
import { Article } from "@/generated/prisma";
import { ARTICLES_PER_PAGE } from "@/utils/constance";
import Link from "next/link";
import DeleteArticleButton from "../../../components/Admin/deleteArticleButton";

interface AdminArticlesProps {
  searchParams: Promise<{
    pageNumber: string;
  }>
}

const AdminArticles = async ({
  searchParams
}: AdminArticlesProps) => {
  const pageNumber = (await searchParams).pageNumber
  const articles: Article[] = await getArticles(pageNumber);
  const count = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLES_PER_PAGE);

  return (
    <div className="py-12 px-4">
      <table className="table shadow w-full text-center">
        <thead className=" border-b-2 border-[#ffffff]/10 rounded main-color font-bold special-text">
          <tr>
            <td className="p-3">Title</td>
            <td className="hidden lg:inline-block p-3">Created At</td>
            <td className="p-3">Actions</td>
            <td className="hidden lg:inline-block p-3"></td>
          </tr>
        </thead>
        <tbody>
          {articles.map((el) => (
            <tr key={el.id} className="border-b-2 border-[#ffffff]/10">
              <td className="p-3 main-text-color">{el.title}</td>
              <td className="hidden lg:inline-block p-3 text-gray-500">
                {new Date(el.createdAt).toDateString()}
              </td>
              <td className="p-3">
                <Link
                  className="main-btn"
                  href={`/admin/articles-table/edit/${el.id}`}
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId={el.id}/>
              </td>
              <td className="p-3">
                <Link href={`/articles/${el.id}`} className="main-text-color font-bold me-3 hidden sm:block">Read more</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        route={"/admin/articles-table"}
        pages={pages}
        pageNumber={parseInt(pageNumber)}
      />
    </div>
  );
};

export default AdminArticles;
