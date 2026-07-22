// app/components/Header.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // 임시로 리스트 페이지로 이동 (검색어 전달)
    window.location.href = `/list?search=${query}`;
  };

  return (
    <header className="p-4 bg-gray-200 flex justify-between">
      <Link href="/">🏠 Main</Link>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색..."
          className="border p-1"
        />
        <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-2">
          검색
        </button>
      </div>
    </header>
  );
}
