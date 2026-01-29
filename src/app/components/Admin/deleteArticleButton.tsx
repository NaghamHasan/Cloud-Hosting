"use client"
import { DOMAIN } from "@/utils/constance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteArticleButtonProps {
    articleId: number
}
const DeleteArticleButton = ({articleId} : DeleteArticleButtonProps) => {
    const router = useRouter();
  const handleDelete = () => {
    if (window.confirm("You are delete this article,are you sur?")) {
      axios
        .delete(`${DOMAIN}/api/articles/${articleId}`)
        .then(() => router.refresh())
        .then(() => toast.success("Article Deleted"))
        .catch((err) => toast.error(err.response.data.message));
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 py-2 px-6 rounded-full font-bold main-text-color cursor-pointer main-text-color mt-3 sm:ms-3"
    >
      Delete
    </button>
  );
};

export default DeleteArticleButton;
