"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

const CommentsInput = ({ articleId }: { articleId: number }) => {
  const [text, setText] = useState("");
  const [click, setClick] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setClick(true);
    if (text.length === 0) {
      e.preventDefault();
    } else {
      axios
        .post(`/api/comments`, { text, articleId })
        .then(() => {
          setText("");
          setClick(false);
        })
        .then(() => router.refresh())
        .catch((err) => setMessage(err.response.data.message));
    }
  };

  return (
    <form className="flex  items-center w-full mt-8">
      <div className="w-full md:w-75 relative m-auto h-[100px]">
        <input
          className="w-[100%] search-bg placeholder:text-[#94a3b8] text-white shadow outline-none rounded p-2"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment"
        />
        <span className="text-red-700 text-sm">
          {text.length === 0 && click
            ? "Please write anything"
            : message
            ? `${message}`
            : ""}
        </span>
        <button
          onClick={submit}
          className="absolute top-[25px] cursor-pointer -translate-y-[50%]  right-1"
        >
          <IoMdSend className="text-2xl special-text" />
        </button>
      </div>
    </form>
  );
};

export default CommentsInput;
