"use client";
import { use, useEffect, useState } from "react";
import Header from "../../../components/Header";
import DetailCalendar from "../../../components/detail/Calendar";
import Reservation from "../../../components/detail/Reservation";
import type { DetailData, Relate } from "@/app/api/types";

// styurls와 relates가 객체 또는 배열일 수 있으므로, 이를 처리하는 유틸리티 함수 작성
function getStyUrls(styurls: DetailData["styurls"]): string[] {// styurls가 없으면 빈 배열 반환
  if (!styurls) return [];
  const inner = styurls.styurl;

  return Array.isArray(inner) ? inner : [inner];
}
function getRelates(relates: DetailData["relates"]): Relate[] {// relates가 없으면 빈 배열 반환
  if (!relates) return [];

  return Array.isArray(relates) ? relates : [relates];
}

export default function DetailPage({ params }: { params: Promise<{ source: string; id: string }> }) {
  const { source, id } = use(params);
  const [detailData, setDetailData] = useState<DetailData | null>(null);

  const url = source === "kopis" ? "/api/detail/kopis?id=" + id : "/api/seoul/detail?id=" + id;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!data.ok) throw new Error(data.error ?? "데이터를 불러오지 못했습니다.");
        setDetailData(Array.isArray(data.performances) ? data.performances[0] ?? null : null);
      } catch (err: any) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Error fetching detail data:", message)
      }
    };
    fetchDetail();
  }, [url]);

  useEffect(() => {
    console.log("Detail data updated:", detailData); // 디버깅용 로그
  }, [detailData]);

  if (!detailData) {
    return (
      <div>
        <Header />
        <p className="p-10 text-center text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // 렌더링 시 styurls를 문자열 URL 배열로 정규화
  const styImageUrls = getStyUrls(detailData.styurls);
  // const relates = getRelates(detailData.relates);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1200px] mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold break-keep text-black">{detailData.title}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-[1fr_280px] gap-10 items-start">
        {/* 좌측 박스 */}
        <div>
          <div className="flex gap-10 items-start">
            <div className="w-[280px] shrink-0">
              <img
                src={detailData.poster}
                alt={detailData.title}
                className="w-full rounded-md border border-gray-200"
              />
            </div>

            {/* 상세 정보 */}
            <div className="flex-1">
              <dl className="divide-y divide-gray-100 text-sm">
                <InfoRow label="장소" value={detailData.fcltynm} />
                <InfoRow label="공연기간" value={detailData.period} bold />
                <InfoRow label="관람연령" value={detailData.prfage} />
                <InfoRow label="가격" value={detailData.pcseguidance} priceStyle />
                <InfoRow label="공연시간" value={detailData.prfruntime} />
                <InfoRow label="공연요일" value={detailData.dtguidance} />
                <InfoRow label="출연진" value={detailData.prfcast} />
              </dl>
            </div>
          </div>

          {styImageUrls.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4">공연 소개 이미지</h2>
              <div className="flex-1">
                {styImageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`공연 소개 ${index + 1}`}
                    className="w-full h-auto rounded-md border border-gray-200"
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* 우측 박스 */}
        <div className="sticky top-6 self-start">
          <DetailCalendar reservedRange={detailData.period} />
          <Reservation relates={getRelates(detailData.relates)} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  bold,
  priceStyle,
}: {
  label: string;
  value?: string;
  bold?: boolean;
  priceStyle?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex py-3">
      <dt className="w-24 shrink-0 text-black">{label}</dt>
      <dd className={`text-gray-600 ${bold ? "font-bold" : priceStyle ? "text-sm leading-6" : ""}`}>{value}</dd>
    </div>
  );
}
