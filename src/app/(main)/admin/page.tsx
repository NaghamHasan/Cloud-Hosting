import ArticleForm from "@/app/components/Admin/articleForm"

const Admin = () => {
  return (
    <div className='flex items-center justify-center w-[100%] h-[100%]'>
      <div className='shadow w-[100%] sm:w-[80%] md:w-[50%]'>
      <div>
        <ArticleForm articleId='' titleFromEditPage='' descriptionFromEditPage=''/>
      </div>
      </div>
    </div>
  )
}

export default Admin;
