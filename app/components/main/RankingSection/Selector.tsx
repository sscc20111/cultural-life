// app/components/AreaSelector.tsx
"use client";
import { useState, useMemo } from "react";
import type { RankingItem } from "@/app/api/types";

export type AreaCode =
  | "ALL"
  | "11" | "28" | "30" | "27" | "29" | "26" | "31" | "36"
  | "41" | "43|44" | "47|48" | "45|46" | "51" | "50" | "UNI";

export type GenreCode =
  | ""
  | "AAAA"
  | "BBBC" | "BBBE" | "CCCA" | "CCCC" | "CCCD" | "EEEA" | "EEEB" | "GGGA";

export const AREA_LIST: { code: AreaCode; label: string }[] = [
  { code: "ALL", label: "전체" },
  { code: "11", label: "서울" },
  { code: "28", label: "인천" },
  { code: "30", label: "대전" },
  { code: "27", label: "대구" },
  { code: "29", label: "광주" },
  { code: "26", label: "부산" },
  { code: "31", label: "울산" },
  { code: "36", label: "세종" },
  { code: "41", label: "경기" },
  { code: "43|44", label: "충청" },
  { code: "47|48", label: "경상" },
  { code: "45|46", label: "전라" },
  { code: "51", label: "강원" },
  { code: "50", label: "제주" },
  { code: "UNI", label: "대학로" },
];

export const GENRE_LIST: { code: GenreCode; label: string }[] = [
  { code: "", label: "전체" },
  { code: "AAAA", label: "연극" },
  { code: "BBBC", label: "무용" },
  { code: "BBBE", label: "대중무용" },
  { code: "CCCA", label: "클래식" },
  { code: "CCCC", label: "국악" },
  { code: "CCCD", label: "대중음악" },
  { code: "EEEA", label: "복합" },
  { code: "EEEB", label: "서커스/마술" },
  { code: "GGGA", label: "뮤지컬" },
];

type Props = {
  onSearch: (area: AreaCode, genre: GenreCode) => void;
  performances: RankingItem[]; // 전체 원본 데이터
};

function CountBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span
      style={{
        position: "absolute",
        top: -6,
        right: -6,
        minWidth: 16,
        height: 16,
        padding: "0 4px",
        borderRadius: 999,
        background: "#fd5f61",
        color: "#fff",
        fontSize: 10,
        lineHeight: "16px",
        textAlign: "center",
      }}
    >
      {count}
    </span>
  );
}

export default function AreaSelector({ onSearch, performances }: Props) {
  const [selectedArea, setSelectedArea] = useState<AreaCode>("ALL");
  const [selectedGenre, setSelectedGenre] = useState<GenreCode>("");

  const handleSearch = () => {
    onSearch(selectedArea, selectedGenre);
  };

  // 지역 배지: 장르가 선택돼 있으면 그 장르로 먼저 필터링한 기준으로 계산
  const areaCounts = useMemo(() => {
    const genreLabel = GENRE_LIST.find((g) => g.code === selectedGenre)?.label;
    const base =
      selectedGenre === "" || !genreLabel
        ? performances
        : performances.filter((item) => item.genre?.includes(genreLabel));

    const counts: Record<string, number> = {};
    AREA_LIST.forEach(({ code, label }) => {
      counts[code] = code === "ALL" ? base.length : base.filter((item) => item.area?.includes(label)).length;
    });
    return counts;
  }, [performances, selectedGenre]);

  // 장르 배지: 지역이 선택돼 있으면 그 지역으로 먼저 필터링한 기준으로 계산
  const genreCounts = useMemo(() => {
    const areaLabel = AREA_LIST.find((a) => a.code === selectedArea)?.label;
    const base =
      selectedArea === "ALL" || !areaLabel
        ? performances
        : performances.filter((item) => item.area?.includes(areaLabel));

    const counts: Record<string, number> = {};
    GENRE_LIST.forEach(({ code, label }) => {
      counts[code] = code === "" ? base.length : base.filter((item) => item.genre?.includes(label)).length;
    });
    return counts;
  }, [performances, selectedArea]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "8px 0" }}>
      {/* 지역 선택 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {AREA_LIST.map((area) => {
          const isActive = area.code === selectedArea;
          return (
            <button
              key={area.code}
              onClick={() => setSelectedArea(area.code)}
              style={{
                position: "relative",
                padding: "6px 14px",
                borderRadius: 20,
                border: isActive ? "1px solid #333" : "1px solid #ddd",
                background: isActive ? "#333" : "#fff",
                color: isActive ? "#fff" : "#333",
                fontSize: 14,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {area.label}
              <CountBadge count={areaCounts[area.code] ?? 0} />
            </button>
          );
        })}
      </div>

      {/* 장르 선택 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {GENRE_LIST.map((genre) => {
          const isActive = genre.code === selectedGenre;
          return (
            <button
              key={genre.code || "ALL_GENRE"}
              onClick={() => setSelectedGenre(genre.code)}
              style={{
                position: "relative",
                padding: "6px 14px",
                borderRadius: 20,
                border: isActive ? "1px solid #333" : "1px solid #ddd",
                background: isActive ? "#333" : "#fff",
                color: isActive ? "#fff" : "#333",
                fontSize: 14,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {genre.label}
              <CountBadge count={genreCounts[genre.code] ?? 0} />
            </button>
          );
        })}
      </div>

      {/* 검색 버튼 */}
      <div>
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 20px",
            borderRadius: 20,
            border: "1px solid #333",
            background: "#333",
            color: "#fff",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          검색
        </button>
      </div>
    </div>
  );
}