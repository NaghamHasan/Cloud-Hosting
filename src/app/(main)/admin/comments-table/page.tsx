export const dynamic = "force-dynamic";

import { GetComments } from "@/apiCalls/adminApiCalls";
import DeleteComment from "@/app/components/comments/DeleteComment";
import { Comment } from "@/generated/prisma";

const AdminComments = async () => {
  const comments: Comment[] = await GetComments();

  return (
    <div className="py-12 px-4">
      {comments.length === 0 ? (
        <div className="font-bold text-3xl main-text-color">No Comments</div>
      ) : (
        <table className="table shadow w-full text-center">
          <thead className=" border-b-2 border-[#ffffff]/10 rounded main-color font-bold special-text">
            <tr>
              <td className="p-3">Comment content</td>
              <td className="hidden lg:inline-block p-3">Created At</td>
              <td className="p-3">Actions</td>
            </tr>
          </thead>
          <tbody>
            {comments.map((el) => (
              <tr key={el.id} className="border-b-2 border-[#ffffff]/10">
                <td className="p-3 main-text-color">{el.text}</td>
                <td className="hidden lg:inline-block p-3 text-gray-500">
                  {new Date(el.createdAt).toDateString()}
                </td>
                <td className="p-3">
                  <DeleteComment commentId={el.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminComments;
