"use client";

import { useEffect, useState } from "react";

type Performance = {
  rank: string;
  id: string;
  title: string;
  period: string;
  genre: string;
  area: string;
  venue: string;
  poster: string;
};

export default function RankingPage() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/kopis")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setPerformances(data.performances);
        } else {
          setError(data.error || "데이터를 불러오지 못했습니다.");
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 24 }}>불러오는 중...</div>;
  if (error) return <div style={{ padding: 24, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h1>공연 랭킹</h1>
      <ol style={{ listStyle: "none", padding: 0 }}>
        {performances.map((p) => (
          <li
            key={p.id}
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 20,
              paddingBottom: 20,
              borderBottom: "1px solid #eee",
            }}
          >
            <img
              src={p.poster}
              alt={p.title}
              width={80}
              height={110}
              style={{ objectFit: "cover", borderRadius: 4 }}
            />
            <div>
              <div style={{ fontWeight: "bold", fontSize: 14, color: "#888" }}>
                {p.rank}위
              </div>
              <div style={{ fontWeight: "bold", fontSize: 16 }}>{p.title}</div>
              <div style={{ fontSize: 14, color: "#555" }}>
                {p.genre} · {p.area}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>{p.venue}</div>
              <div style={{ fontSize: 13, color: "#888" }}>{p.period}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}