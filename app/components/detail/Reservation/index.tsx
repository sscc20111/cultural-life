"use client";
// 추가: 드롭다운 상태 관리를 위해 useState import
import { useEffect, useState } from "react";
import type { Relate } from "@/app/api/types";

interface ReservationProps {
    relates: Relate[];
}

export default function Reservation({ relates }: ReservationProps) {
    // 추가: 드롭다운 열림/닫힘 상태
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!relates || relates.length === 0) {
            console.warn("Reservation URL is not available.", relates);
        } else {
            console.log("Reservation URL received:", relates);
        }
    }, [relates]);

  // 유지: 예매처 없을 때 비활성 버튼
    if (!relates || relates.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <button
                className="w-full bg-blue-600 text-white font-bold rounded-md py-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
                >
                    예매하기
                </button>
            </div>
        );
    }

    // 추가: 예매처가 1개뿐이면 드롭다운 없이 바로 링크 버튼 하나만 보여줌
    if (relates.length === 1) {
        const only = relates[0];
        return (
            <div className="w-full mt-4">
                <a
                href={only.relateurl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-blue-600 text-white font-bold rounded-md py-3 text-center block hover:bg-blue-700 transition-colors"
                >
                    예매하기
                </a>
            </div>
        );
    }

    // 추가: 예매처가 2개 이상이면 드롭다운 방식으로 렌더링
    return (
        <div className="relative w-full mt-4">
            {/* 추가: 평소엔 이 버튼 하나만 보임 (클릭 시 목록 토글) */}
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-full bg-blue-600 text-white font-bold rounded-md py-3 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    예매처 선택하기
                    {/* 추가: 열림 상태에 따라 화살표 방향 회전 */}
                    <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                </button>

            {/* 추가: isOpen이 true일 때만 예매처 목록 드롭다운으로 표시 */}
            {isOpen && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-10">
                    {relates.map((relate) => (
                        <li key={relate.relateurl}>
                        <a
                            href={relate.relateurl}
                            target="_blank"
                            rel="noreferrer"
                            className="block px-4 py-3 text-sm text-gray-800 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                        >
                            {relate.relatenm}
                        </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}