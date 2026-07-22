"use client";

import { useState } from "react";

export default function TestPage() {
  const [result1, setResult1] = useState<string>("");
  const [result2, setResult2] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchApis = async () => {
    setLoading(true);
    try {
    //   const [r1] = await Promise.all([
      const [r1, r2] = await Promise.all([
        fetch("/api/kopis").then((r) => r.json()),
        fetch("/api/seoul").then((r) => r.json()),
      ]);

      console.log("API1 raw:", r1);
      console.log("API2 raw:", r2);

      setResult1(JSON.stringify(r1, null, 2));
      setResult2(JSON.stringify(r2, null, 2));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "monospace" }}>
      <h1>API 연동 테스트</h1>
      <button onClick={fetchApis} disabled={loading}>
        {loading ? "불러오는 중..." : "API 호출 테스트"}
      </button>

      <h2>API 1 결과</h2>
      <pre style={{ background: "#f4f4f4", padding: 12, whiteSpace: "pre-wrap" }}>
        {result1}
      </pre>

      <h2>API 2 결과</h2>
      <pre style={{ background: "#f4f4f4", padding: 12, whiteSpace: "pre-wrap" }}>
        {result2}
      </pre>
    </div>
  );
}