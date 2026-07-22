// app/list/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";

export default function ListPage() {
  const [data, setData] = useState<any>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("search");

  useEffect(() => {
    fetch(`/api/cultural?search=${query || ""}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [query]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <h1>리스트 페이지</h1>
      <ul>
        {data.movies.map((m: any) => (
          <li key={m.id}>{m.title}</li>
        ))}
      </ul>
    </div>
  );
}
