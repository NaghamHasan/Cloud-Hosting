import Link from "next/link";
import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

interface paginationProps {
  pages: number;
  route: string;
  pageNumber: number;
}

const Pagination = async ({ pages, route, pageNumber }: paginationProps) => {
  const numbersarray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    numbersarray.push(i);
  }

  return (
    <div className="flex justify-center mt-3 w-[100%] items-center py-5 left-0 gap-1 m-auto">
      {pageNumber > 1 && <Link
        className="me-3 cursor-pointer text-white"
        href={`${route}?pageNumber=${pageNumber - 1}`}
      >
        <SlArrowLeft />
      </Link>}
      {numbersarray.map((el, key) => (
        <Link
          href={`${route}?pageNumber=${el}`}
          className={`${pageNumber===el ? "bg-[#00d1ff] text-white": "bg-white/10 text-gray-400"} font-bold border-1 border-white/20 rounded-full cursor-pointer py-1 px-2`}
          key={key}
        >
          {el}
        </Link>
      ))}
      {pageNumber < pages && <Link
        className="ms-3 cursor-pointer text-white"
        href={`${route}?pageNumber=${pageNumber + 1}`}
      >
        <SlArrowRight />
      </Link>}
    </div>
  );
};

export default Pagination;
