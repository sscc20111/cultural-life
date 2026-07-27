// app/page.tsx
"use client";
import Header from "./components/Header";

import RankingSection from "./components/main/RankingSection";

export default function MainPage() {

  return (
    <div>
      <Header />
      <h1>메인 페이지</h1>
      <h2>seoul 베너</h2>

      <RankingSection />

      <h2>kopis 축제 베너</h2>
    </div>
  );
}