// BannerSection.tsx
"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

import "./style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import type { BannerItem } from "@/lib/api/kopis/types";

export default function BannerSection() {
    const [bannerData, setBannerData] = useState<BannerItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const res = await fetch("/api/seoul");
                const data = await res.json();
                if (!data.ok) throw new Error(data.error ?? "데이터를 불러오지 못했습니다.");
                setBannerData(data.performances);
            } catch (err: any) {
                console.error("Error fetching banner data:", err.message);
            }
        };
        fetchBannerData();
    }, []);

    if (bannerData.length === 0) return null;

    return (
        <div className="banner-section">
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                loop
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                    el: ".banner__dots",
                    bulletClass: "banner__dot",
                    bulletActiveClass: "banner__dot--active",
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="banner__swiper"
            >
                {bannerData.map((item, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <SwiperSlide key={item.title}>
                            <div
                                className={`banner__slide-inner ${
                                    isEven ? "banner__slide-inner--imgLeft" : "banner__slide-inner--imgRight"
                                }`}
                                style={{
                                    background: `linear-gradient(135deg, ${item.gradientColors[0]}, ${item.gradientColors[1]})`,
                                }}
                            >
                                <div className="banner__slide-content">
                                    <div className="banner__image">
                                        <Image
                                            src={item.poster}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                            style={{ objectFit: "cover" }}
                                            priority={index === 0}
                                        />
                                    </div>
                                    <div className="banner__info">
                                        <h3>{item.title}</h3>
                                        <p>{item.date}</p>
                                        <p>{item.place}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div className="banner__counter">
                {String(activeIndex + 1).padStart(2, "0")} / {String(bannerData.length).padStart(2, "0")}
            </div>

        </div>
    );
}