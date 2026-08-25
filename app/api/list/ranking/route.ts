import { fetchXml, toArray, getRecentDateRange } from "@/app/api/xmlFetch";

export async function GET(req: Request) {
    const Key = process.env.KPOPS_KEY;
    try {
        if (!Key) throw new Error("KPOPS_KEY 환경변수가 설정되지 않았습니다.");

        const { searchParams } = new URL(req.url);
        const catecode = searchParams.get("category"); // "ALL" 이거나 장르 코드

        const { stdate, eddate } = getRecentDateRange(30);
        let url = `http://kopis.or.kr/openApi/restful/boxoffice?service=${Key}&stdate=${stdate}&eddate=${eddate}`;

        if (catecode) url += `&catecode=${catecode}`;
        const parsed = await fetchXml(url);
        const list = toArray(parsed?.boxofs?.boxof);

        const performances = list.map((item: any) => ({
            rank: item.rnum,
            id: item.mt20id,
            title: item.prfnm,
            period: item.prfpd,
            venue: item.prfplcnm,
            poster: item.poster,
            genre: item.cate,
        }));

        return Response.json({ ok: true, count: performances.length, performances });
    } catch (err: any) {
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}