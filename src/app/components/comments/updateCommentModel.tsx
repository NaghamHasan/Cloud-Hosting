"use client";
import { DOMAIN } from "@/utils/constance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface UpdateCommentModel {
  id: string;
  text: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateCommentModel = ({ id, text, setOpen }: UpdateCommentModel) => {
  const [click, setClick] = useState(false);
  const router = useRouter();

  const updateComment = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClick(true);
    if (commentAfterUpdat.length === 0) {
      e.preventDefault();
    } else {
      axios
        .put(`${DOMAIN}/api/comments/${id}`, { text: commentAfterUpdat })
        .then(() => setOpen(false))
        .then(() => router.refresh())
        .then(() => toast.success("comment updated"))
        .catch((err) => {
          toast.error(err.response.data.message);
          setOpen(false);
        }
      );
    }
  };
  const [commentAfterUpdat, setCommentAfterUpdat] = useState(text);
  return (
    <div className="fixed left-0 top-0 w-[100%] h-[100%] bg-[#00000040] flex items-center justify-center">
      <div className="bg-gray-50 shadow w-11/12 md:w-1/2 lg:w-1/3 h-1/3 p-4 rounded-lg">
        <div className="close cursor-pointer flex justify-end text-2xl">
          <IoCloseCircleOutline onClick={() => setOpen(false)} />
        </div>
        <div>
          <h1 className="font-bold text-xl text-[#193d4b]">
            Edit your comment
          </h1>
          <input
            type="text"
            className="w-full outline-none my-6 shadow p-1 bg-white rounded"
            value={commentAfterUpdat}
            onChange={(e) => setCommentAfterUpdat(e.target.value)}
          />
          {commentAfterUpdat.length === 0 && click && (
            <span className={`text-red-700 text-sm ${commentAfterUpdat.length === 0 && click ? "block" : "hidden"}`}>Write anything</span>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={updateComment}
            className="button bg-[#193d4b] p-2 text-white rounded cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCommentModel;
