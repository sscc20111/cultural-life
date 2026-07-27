import { fetchXml, toArray, getRecentDateRange } from "@/lib/server/xmlFetch";

export async function GET() {
  const Key = process.env.SEOUL_KEY;
  try {
    if (!Key) throw new Error("SEoul_KEY 환경변수가 설정되지 않았습니다.");

    let url = `http://openapi.seoul.go.kr:8088/${Key}/xml/culturalEventInfo/1/10/`;

    const parsed = await fetchXml(url);
    const list = toArray(parsed?.culturalEventInfo?.row);

    const performances = list.map((item: any) => ({
      codename: item.CODENAME, //분류
      guname: item.GUNAME, //자치구
      title: item.TITLE, //공연명
      date: item.DATE, //공연기간
      place: item.PLACE, //공연장소
      poster: item.MAIN_IMG, //공연이미지
    }));

        return Response.json({ ok: true, count: performances.length, performances });
    } catch (err: any) {
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}