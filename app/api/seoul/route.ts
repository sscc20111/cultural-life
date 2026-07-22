export async function GET() {
  try {
    const res = await fetch(process.env.API2_URL!, {
      // 필요하면 헤더/인증 추가
      headers: { Authorization: `Bearer ${process.env.API2_KEY}` },
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";
    const raw = await res.text(); // JSON이든 XML이든 일단 text로 받아버림

    return new Response(
      JSON.stringify({
        ok: res.ok,
        status: res.status,
        contentType,
        raw, // 원문 그대로
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}