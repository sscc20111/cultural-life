"use client";

import { useEffect, useState } from "react";
import { fetchKopisFestival } from "@/lib/api/kopis";
import { FestivalItem } from "@/lib/api/kopis";


export default function RankingPage() {
  const [performances, setPerformances] = useState<FestivalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchKopisFestival()
      .then(setPerformances)//성공적으로 데이터를 가져오면 performances 상태를 업데이트
      .catch((e) => setError(e.message))//에러 발생 시 에러 메시지를 상태에 저장
      .finally(() => setLoading(false));//로딩상태 출력
  }, []);

  if (loading) return <div style={{ padding: 24 }}>불러오는 중...</div>;
  if (error) return <div style={{ padding: 24, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h1>페스티벌 테스트</h1>
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
              <div style={{ fontWeight: "bold", fontSize: 16 }}>{p.title}</div>
              <div style={{ fontSize: 14, color: "#555" }}>
                {p.genre}
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