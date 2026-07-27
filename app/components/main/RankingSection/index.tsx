// app/page.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import AreaSelector, {
  AreaCode,
  GenreCode,
  AREA_LIST,
  GENRE_LIST,
} from "./Selector";
import type { RankingItem } from "@/lib/api/kopis/types";

export default function RankingSection() {
  // API에서 최초 1회 받아온 전체 데이터
  const [allPerformances, setAllPerformances] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 검색 버튼을 눌러야 바뀌는, 필터링 기준값
  const [appliedArea, setAppliedArea] = useState<AreaCode>("ALL");
  const [appliedGenre, setAppliedGenre] = useState<GenreCode>("");

  // 최초 렌더링 시 1번만 fetch
  useEffect(() => {
    const fetchPerformances = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/kopis/ranking?area=" + appliedArea + "&genre=" + appliedGenre);
        const data = await res.json();
        if (!data.ok) throw new Error(data.error ?? "데이터를 불러오지 못했습니다.");
        setAllPerformances(data.performances);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPerformances();
  }, []); // 의존성 배열 비움 -> 최초 1회만 실행

  const handleSearch = (area: AreaCode, genre: GenreCode) => {
    setAppliedArea(area);
    setAppliedGenre(genre);
  };

  // 재요청 없이 기존 데이터에서 필터링
  const filteredPerformances = useMemo(() => {
    const areaLabel = AREA_LIST.find((a) => a.code === appliedArea)?.label;
    const genreLabel = GENRE_LIST.find((g) => g.code === appliedGenre)?.label;
    return allPerformances.filter((item) => {
      const areaMatch =
        appliedArea === "ALL" || !areaLabel || item.area?.includes(areaLabel);
      const genreMatch =
        appliedGenre === "" || !genreLabel || item.genre?.includes(genreLabel);
      return areaMatch && genreMatch;
    });
  }, [allPerformances, appliedArea, appliedGenre]);

  return (
    <div>
      <AreaSelector onSearch={handleSearch} performances={allPerformances} />

      {loading && <p>불러오는 중...</p>}
      {error && <p>에러: {error}</p>}
      {!loading && !error && filteredPerformances.length === 0 && (
        <p>해당 조건의 공연이 없습니다.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
          marginTop: 16,
        }}
      >
        {filteredPerformances.map((item) => (
          <div key={item.id}>
            <img
              src={item.poster}
              alt={item.title}
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 8 }}
            />
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <span style={{ fontSize: 12, padding: "2px 8px", border: "1px solid #ddd", borderRadius: 4 }}>
                {item.genre}
              </span>
              <span style={{ fontSize: 12, padding: "2px 8px", border: "1px solid #ddd", borderRadius: 4 }}>
                {item.area}
              </span>
            </div>
            <p style={{ fontWeight: 600, marginTop: 6 }}>{item.title}</p>
            <p style={{ fontSize: 13, color: "#777" }}>{item.period}</p>
          </div>
        ))}
      </div>

    </div>
  );
}