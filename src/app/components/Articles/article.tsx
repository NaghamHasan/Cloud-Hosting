import { Article } from "@/generated/prisma";
import React from "react";
import "./article.css"

interface ArticleItemProps {
  article: Article;
}

const ArticleComponent = ({ article }: ArticleItemProps) => {
  return (
    // أضفنا h-full لضمان أن الكارد يملأ مساحة الـ Grid المتاحة
    // وأضفنا flex flex-col لتوزيع العناصر داخله عمودياً
    <div className="relative group h-full flex flex-col glass-bg text-center hover:-translate-y-3 transition-transform rounded-2xl p-6">
      <div className="relative z-9 flex flex-col h-full">
        <h1 className="text-xl font-bold line-clamp-1 main-text-color mb-3">
          {article.title}
        </h1>
        {/* أضفنا flex-grow هنا ليدفع الزر دائماً للأسفل */}
        <p className="my-2 overflow-hidden line-clamp-2 text-truncate second-text-color text-sm flex-grow">
          {article.description}
        </p>
        {/* الزر الآن سيكون دائماً في نفس المستوى في كل الكاردات */}
        <div className="mt-auto pt-4">
          <button className="w-full cursor-pointer border rounded-full main-text-color font-bold shadow-[0_0_10px_rgba(0,209,255,0.8)] group-hover:shadow-[0_0_15px_rgba(0,209,255,1)] transition-shadow border-[#00d1ff] py-3 flex items-center justify-center gap-2">
            Learn more
            <span className="arrow-move transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleComponent;
