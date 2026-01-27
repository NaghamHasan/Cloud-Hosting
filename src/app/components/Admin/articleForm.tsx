"use client";
import React, { useState } from "react";
import module from "../../components/Header/header.module.css";
import { DOMAIN } from "@/utils/constance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormProps {
  titleFromEditPage: string | "";
  descriptionFromEditPage: string | "";
  articleId: string | "";
}

const Form = ({
  titleFromEditPage,
  descriptionFromEditPage,
  articleId,
}: FormProps) => {
  const [title, setTitle] = useState(titleFromEditPage);
  const [description, setDescription] = useState(descriptionFromEditPage);

  const [click, setClick] = useState(false);
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setClick(true);
    if (title.length < 2 || description.length < 10) {
      e.preventDefault();
    } else {
      if (titleFromEditPage === "") {
        axios
          .post(`${DOMAIN}/api/articles`, { title, description })
          .then(() => toast.success("Article created"))
          .then(() => {
            setTitle("");
            setDescription("");
            setClick(false);
          })
          .catch((err) => toast.error(err.response.data.message));
      } else {
        axios
          .put(`${DOMAIN}/api/articles/${articleId}`, { title, description })
          .then(() => toast.success("Article updated"))
          .then(() => {
            router.refresh();
          })
          .catch((err) => toast.error(err.response.data.message));
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 glass-bg rounded-2xl shadow-2xl">
      <h2 className="text-3xl text-center bg-clip-text font-black text-transparent bg-gradient-to-bl from-[#ffffff] to-[#00d1ff] mb-8 tracking-tight">
        {titleFromEditPage==="" ? "Create New Article" : "Update Article"}
      </h2>
      <form className="space-y-6" onSubmit={submit}>
        <div>
          <label className="block text-sm font-medium second-text-color mb-2 ml-1">
            Title
          </label>
          <input
            type="text"
            name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            className="w-full px-5 py-3 bg-cyan-500/10 border border-white/10 rounded-xl text-white placeholder-gray-500 
                      focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
          />
          {title.length < 2 && click && (
          <span className="text-red-700 text-sm">This field must contain 2 char at least</span>
        )}
        </div>

        {/* حقل المحتوى الرئيسي */}
        <div>
          <label className="block text-sm font-medium second-text-color mb-2 ml-1">
            Description
          </label>
          <textarea
            name="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your article content here..."
            className="w-full px-5 bg-cyan-500/10 border border-white/10 rounded-xl text-white placeholder-gray-500 
                      focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
          />
          {description.length < 10 && click && (
          <span className="text-red-700 text-sm mb-7">
            This field must contain 10 char at least
          </span>
        )}
        </div>
        <div className="pt-4 text-center">
          <button type="submit" className="main-btn">
            {titleFromEditPage==="" ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
