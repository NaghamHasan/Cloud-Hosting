"use client";
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { CommentWithUsername } from "@/utils/types";
import UpdateCommentModel from "./updateCommentModel";
import DeleteComment from "./DeleteComment";

interface CommentProps {
  comment: CommentWithUsername;
  userId: number | undefined;
}

const Comment = ({ comment, userId }: CommentProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-[100%] p-5 glass-bg shadow-lg rounded mb-3 m-auto">
      <div className=" flex justify-between items-center">
        <h1 className="font-bold main-text-color">{comment.user.username}</h1>
        <span className="text-gray-500">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <div className="flex items-center justify-between items-center">
        <div className="second-text-color pt-4">{comment.text}</div>
        {userId && userId === comment.userId ? (
          <div className="flex items-center justify-end gap-5">
            <MdModeEditOutline
              onClick={() => setOpen(true)}
              className="special-text cursor-pointer"
            />
            <DeleteComment commentId={comment.id} />
          </div>
        ) : (
          ""
        )}
        {open && (
          <UpdateCommentModel
            id={comment.id.toString()}
            text={comment.text}
            setOpen={setOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
