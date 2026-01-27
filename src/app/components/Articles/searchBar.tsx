"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/articles/search?searchText=${search}`);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-8">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 shadow-lg"
      />
      <button onClick={submit} className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 main-bg hover:bg-cyan-400 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
        <BiSearch className="text-xl"/>
      </button>
    </div>
  );
};

export default SearchBar;
