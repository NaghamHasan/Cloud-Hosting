import { GetSingleArticle } from "@/apiCalls/articleApiCall"
import Form from "@/app/components/Admin/articleForm"
import { Article } from "@/generated/prisma"

interface EditArticlePageProps {
    params: Promise<{
        id: string
    }>
}

const EditArticlePage = async ({params} : EditArticlePageProps) => {
    const id = (await params).id;
    const article: Article = await GetSingleArticle(id);
    console.log(article)
  return (
    <div className='flex items-center justify-center w-[100%] h-[100%]'>
      <div className=' shadow w-[50%] p-5 rounded-lg'>
      <Form titleFromEditPage={article.title} descriptionFromEditPage={article.description} articleId={article.id.toString()}/>
    </div>
    </div>
  )
}

export default EditArticlePage
