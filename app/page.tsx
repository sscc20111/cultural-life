// app/page.tsx
"use client";
import Header from "./components/Header";

import RankingSection from "./components/main/RankingSection";
import BannerSection from "./components/main/BannerSection";
import FestivalSection from "./components/main/FestivalSection";

export default function MainPage() {

  return (
    <div>
      <Header />
      <BannerSection />
      <RankingSection />
      <FestivalSection />
    </div>
  );
}