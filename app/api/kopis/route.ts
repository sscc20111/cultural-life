export async function GET() {
  // const Key = process.env.SEOUL_KEY;
  const Key = process.env.KPOPS_KEY;
  try {
    const res = await fetch(`http://www.kopis.or.kr/openApi/restful/pblprfr?service=${Key}&stdate=20230601&eddate=20230630&cpage=1&rows=10&prfstate=02&signgucode=11&signgucodesub=1111&kidstate=Y`, {
      // 필요하면 헤더/인증 추가
      // headers: { Authorization: `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${Key}&stdate=20230601&eddate=20230630&cpage=1&rows=10&prfstate=02&signgucode=11&signgucodesub=1111&kidstate=Y` },
      cache: "no-store",
    });
    
    console.log("Key:", Key);
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