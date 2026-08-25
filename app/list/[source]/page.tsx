// app/list/[source]/page.tsx
"use client";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "@/app/components/Header";
import ListCard from "@/app/components/list/card";
import ListColumn from "@/app/components/list/column";
import Pagination from "@/app/components/list/pagination";

type ListDataItem = {// 공연 축제 항목의 타입 정의
    id: string;// 공연 ID
    title: string;// 공연 제목
    period: string;// 공연 기간
    venue: string;// 공연 장소
    poster: string;// 공연 포스터 이미지 URL
    genre: string;// 공연 장르
    rank?: number;
};

export default function ListPage({ params }: { params: Promise<{ source: string }> }) {
    // 상태값 저장
    const [ListData, setListData] = useState<ListDataItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const totalPages = 5; // 임시 전체 페이지 수 (API 응답값으로 교체)
    // url사용
    const { source } = use(params); // 랭킹, 리스트 분기 코드
    const searchParams = useSearchParams(); // 랭킹의 경우 category 쿼리값을 읽어오기 위해 useSearchParams 사용
    const category = searchParams.get("category") ?? ""; // ?category=값 읽기 (없으면 빈 문자열)
    const isRanking = source === "ranking";
    useEffect(() => {
        const fetchListData = async () => {
            try {
                const query = new URLSearchParams();
                if (!isRanking) {
                    query.set("page", String(currentPage));
                }
                if (category) {
                    query.set("category", category); // 값이 있을 때만 추가
                }
                const res = await fetch(`/api/list/${source}?${query.toString()}`); // 조립된 query 사용
                const data = await res.json();

                if (!data.ok) throw new Error(data.error ?? "데이터를 불러오지 못했습니다.");
                setListData(data.performances);
            } catch (err: any) {
                console.error("Error fetching list data:", err.message);
            }
        };
        fetchListData();
    }, [currentPage, category]); // currentPage와 category가 변경될 때마다 실행
    
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-2">
                <h1 className="text-xl font-bold text-black">리스트 페이지</h1>
                <p className="text-sm text-gray-400">{source}</p>
                <p className="text-sm text-gray-400">{category}</p>
            </div>

            {isRanking ? <ListColumn items={ListData} /> : <ListCard items={ListData} />}

            {/* 하단 페이지네이션 */}
            {isRanking ? null : <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
            
        </div>
    );
}