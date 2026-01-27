import CommentsInput from "@/app/components/comments/commentsInput";
import Comment from "@/app/components/comments/comment";
import { ArticleWithComments } from "@/utils/types";
import { VerifyTokenPages } from "@/utils/verifyToken";
import { GetSingleArticle } from "@/apiCalls/articleApiCall";

interface PropsForm {
  params: Promise<{ id: string }>;
}

const ArticleInfo = async ({ params }: PropsForm) => {
  const user = await VerifyTokenPages();
  const id = (await params).id;

  const articleInfo: ArticleWithComments = await GetSingleArticle(id);
  return (
    <div className="pt-9 flex justify-center">
      <div className="container px-6 mt-6">
        <div className="w-[100%] lg:w-2/3  m-auto ">
          <div className="shadow-lg glass-bg rounded-lg py-8 px-11">
            <h1 className="font-bold text-2xl special-text">
              {articleInfo.title}
            </h1>
            <span className="block text-gray-500 pt-5">
              {new Date(articleInfo.createdAt).toDateString()}
            </span>
            <p className="pt-4 second-text-color">{articleInfo.description}</p>
          </div>
          <div className="text-center">
            {user ? (
              <CommentsInput articleId={articleInfo.id} />
            ) : (
              <p className="text-red-500 text-xl font-bold py-4">
                Log in to write comment
              </p>
            )}
          </div>
          <h1 className="text-xl font-bold py-4 special-text">Comments</h1>
          {articleInfo.comments.length === 0 ? (
            <p className="text-center text-red-500 text-xl font-bold py-4">Not found</p>
          ) : (
            articleInfo.comments.map((el, key) => (
              <Comment userId={user?.id} key={key} comment={el} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleInfo;
