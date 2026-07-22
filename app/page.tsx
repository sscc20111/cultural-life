// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";

export default function MainPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/cultural")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <h1>메인 페이지</h1>
      <h2>영화 랭킹 Top 10</h2>
      <ul>
        {data.movies.slice(0, 10).map((m: any) => (
          <li key={m.id}>{m.title}</li>
        ))}
      </ul>
    </div>
  );
}
