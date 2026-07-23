// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";

export default function MainPage() {

  return (
    <div>
      <Header />
      <h1>메인 페이지</h1>
      <h2>seoul 베너</h2>
      <h2>kopis 컨텐츠</h2>
      <h2>kopis 축제 베너</h2>
    </div>
  );
}
