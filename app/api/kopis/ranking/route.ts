import { fetchXml, toArray, getRecentDateRange } from "@/lib/server/xmlFetch";

export async function GET(req: Request) {
    const Key = process.env.KPOPS_KEY;
    try {
        if (!Key) throw new Error("KPOPS_KEY 환경변수가 설정되지 않았습니다.");

        const { searchParams } = new URL(req.url);
        const area = searchParams.get("area"); // "ALL" 이거나 시도 코드
        const genre = searchParams.get("genre"); // "ALL" 이거나 장르 코드

        const { stdate, eddate } = getRecentDateRange(30);
        let url = `http://kopis.or.kr/openApi/restful/boxoffice?service=${Key}&stdate=${stdate}&eddate=${eddate}`;

        // area가 있고 "ALL"이 아니면 쿼리에 추가
        if (area && area !== "ALL") {
            url += `&area=${area}`;
        }
        if (genre) url += `&catecode=${genre}`;

        const parsed = await fetchXml(url);
        const list = toArray(parsed?.boxofs?.boxof);

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

        return Response.json({ ok: true, count: performances.length, performances });
    } catch (err: any) {
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}