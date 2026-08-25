// app/components/Header.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { GENRE_LIST } from "@/app/components/main/RankingSection/Selector";

export default function Header() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // 임시로 리스트 페이지로 이동 (검색어 전달)
    window.location.href = `/list?search=${query}`;
  };

  return (
    <header className="w-full border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center gap-6">
        {/* 로고 */}
        <Link href="/" className="text-xl font-bold text-black shrink-0 whitespace-nowrap">
          NOL<span className="text-blue-600">interpark</span>
        </Link>

        {/* 검색창 */}
        <div className="flex-1 max-w-[520px]">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // 엔터로 검색 가능
              className="flex-1 outline-none text-sm placeholder:text-gray-400"
            />
            <button onClick={handleSearch} aria-label="검색">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7 7 0 104.35 4.35a7 7 0 0012.3 12.3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <nav className="max-w-[1200px] mx-auto px-6">
        <ul className="flex items-center gap-6 h-11 text-sm text-gray-700 overflow-x-auto whitespace-nowrap">
          {GENRE_LIST.map((genre) => (
            <li key={genre.code || "all"}>
              <Link href={`/list/ranking?category=${encodeURIComponent(genre.code)}`} className="hover:text-blue-600">
                {genre.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}