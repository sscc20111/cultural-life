"use client";
import { useEffect, useRef, useState } from "react"; // 수정: useRef 추가 (커스텀 네비게이션 버튼 연결용)
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules"; // 수정: Navigation 모듈 추가
import type { Swiper as SwiperType } from "swiper"; // 추가: swiper 인스턴스 타입
import Image from "next/image";
import type { FestivalItem } from "@/app/api/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // 추가
import "./style.css";


export default function FestivalSection() {
    const [festivalsData, setFestivalsData] = useState<FestivalItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true); // 추가: 오토플레이 재생/일시정지 상태
    const swiperRef = useRef<SwiperType | null>(null); // 추가: swiper 인스턴스 참조

    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                const res = await fetch("/api/main/festival");
                const data = await res.json();
                if (!data.ok) throw new Error(data.error ?? "데이터를 불러오지 못했습니다.");
                setFestivalsData(data.performances);
            } catch (err: any) {
                console.error("Error fetching festival data:", err.message);
            }
        };
        fetchFestivals();
    }, []); // 의존성 배열 비움 -> 최초 1회만 실행

    const handleTogglePlay = () => {
        if (!swiperRef.current) return;
        if (isPlaying) {
            swiperRef.current.autoplay.stop();
        } else {
            swiperRef.current.autoplay.start();
        }
        setIsPlaying((prev) => !prev);
    };

    if (festivalsData.length === 0) return null;

    return (
        <div className="festival-section">
            <div className="festival__header">
                <h2 className="festival__title">
                    문화 페스티벌 <span className="festival__title-arrow">›</span>
                </h2>

                <div className="festival__controls">
                    <button
                        type="button"
                        className="festival__control-btn"
                        aria-label="이전 슬라이드"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        ‹
                    </button>
                    <span className="festival__control-divider" />
                    <button
                        type="button"
                        className="festival__control-btn"
                        aria-label={isPlaying ? "일시정지" : "재생"}
                        onClick={handleTogglePlay}
                    >
                        {isPlaying ? "❚❚" : "▶"}
                    </button>
                    <span className="festival__control-divider" />
                    <button
                        type="button"
                        className="festival__control-btn"
                        aria-label="다음 슬라이드"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        ›
                    </button>
                </div>
            </div>

            <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    loop
                    slidesPerView={3}
                    spaceBetween={20}
                    grabCursor
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{
                        clickable: true,
                        el: ".festival__dots",
                        bulletClass: "festival__dot",
                        bulletActiveClass: "festival__dot--active",
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 2, spaceBetween: 16 },
                        1024: { slidesPerView: 3, spaceBetween: 20 },
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)} // 추가
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="festival__swiper"
            >
                {festivalsData.map((item, index) => {
                    const isEven = index % 2 === 0;
                    // 추가: period("YYYYMMDD~YYYYMMDD")를 "YYYY.MM.DD ~ YYYY.MM.DD" 형태로 가공
                    const [from, to] = item.period?.split("~") ?? [];
                    const formatDate = (d?: string) =>
                        d && d.length === 8 ? `${d.slice(0, 4)}.${d.slice(4, 6)}.${d.slice(6, 8)}` : d;

                    return (
                        <SwiperSlide key={item.id}>
                            <div className={`festival__slide ${isEven ? "even" : "odd"}`}>
                                <div className="festival__card">
                                    <div className="festival__image">
                                        <Image src={item.poster} alt={item.title} fill />

                                        {item.genre && (
                                            <span className="festival__genre-tag">{item.genre}</span>
                                        )}

                                        <span className="festival__play-btn" aria-hidden>
                                            ▶
                                        </span>
                                    </div>

                                    <div className="festival__info">
                                        <p className="festival__video-title">{item.title}</p>
                                        <p className="festival__venue">{item.venue}</p>
                                        <p className="festival__period">
                                            {formatDate(from)} ~ {formatDate(to)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div className="festival__dots" />
        </div>
    );
}