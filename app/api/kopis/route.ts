import { XMLParser } from "fast-xml-parser";

function getDateRange() {// 오늘 날짜를 기준으로 30일 전부터 오늘까지의 날짜 범위를 계산합니다.
  const today = new Date();
  const eddate = formatDate(today);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  const stdate = formatDate(thirtyDaysAgo);

  return { stdate, eddate };
}

function formatDate(date: Date) {// 날짜를 YYYYMMDD 형식으로 변환합니다.
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

export async function GET() {
  const Key = process.env.KPOPS_KEY;

  try {
    if (!Key) {
      throw new Error("KPOPS_KEY 환경변수가 설정되지 않았습니다.");
    }

    const { stdate, eddate } = getDateRange();

    const res = await fetch(
      `http://kopis.or.kr/openApi/restful/boxoffice?service=${Key}&stdate=${stdate}&eddate=${eddate}`,
      { cache: "no-store" }
    );

    const xmlText = await res.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
    });
    const parsed = parser.parse(xmlText);

    const rawList = parsed?.boxofs?.boxof;
    const list = Array.isArray(rawList) ? rawList : rawList ? [rawList] : [];

    const performances = list.map((item: any) => ({
      rank: item.rnum,
      id: item.mt20id,
      title: item.prfnm,
      period: item.prfpd,
      genre: item.cate,
      area: item.area,
      venue: item.prfplcnm,
      poster: item.poster,
    }));

    return Response.json({
      ok: true,
      stdate,
      eddate,
      count: performances.length,
      performances,
    });
  } catch (err: any) {
    console.error("KOPIS API 에러:", err.message);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}