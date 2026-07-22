// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";

export default function MainPage() {

  return (
    <div>
      <Header />
      <h1>메인 페이지</h1>
      <h2>영화 랭킹 Top 10</h2>
    </div>
  );
}
