import { fetchXml, toArray, getRecentDateRange } from "@/lib/server/xmlFetch";

export async function GET() {
    const Key = process.env.KPOPS_KEY;
    try {
        if (!Key) throw new Error("KPOPS_KEY 환경변수가 설정되지 않았습니다.");

        const { stdate, eddate } = getRecentDateRange(30);// 오늘 날짜를 기준으로 30일 전부터 오늘까지의 날짜 범위를 계산합니다.
        const url = `http://www.kopis.or.kr/openApi/restful/prffest?service=${Key}&stdate=${stdate}&eddate=${eddate}&cpage=1&rows=10`;
        const parsed = await fetchXml(url);// 주어진 URL에서 XML 데이터를 가져와 파싱합니다.
        const list = toArray(parsed?.dbs?.db);// XML 데이터를 배열로 변환합니다.

        const performances = list.map((item: any) => ({
            id: item.mt20id,
            title: item.prfnm,
            period: `${item.prfpdfrom}~${item.prfpdto}`,
            venue: item.fcltynm,
            poster: item.poster,
            genre: item.genrenm
        }));

        return Response.json({ ok: true, count: performances.length, performances });
    } catch (err: any) {
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}