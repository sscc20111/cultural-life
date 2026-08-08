import { fetchXml, toArray } from "@/app/api/xmlFetch";

export async function GET(req: Request) {
    const Key = process.env.KPOPS_KEY;
    try {
        if (!Key) throw new Error("KPOPS_KEY 환경변수가 설정되지 않았습니다.");

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        let url = `http://www.kopis.or.kr/openApi/restful/pblprfr/${id}?service=${Key}`;
        
        const parsed = await fetchXml(url);
        const list = toArray(parsed?.dbs?.db);
        const performances = list.map((item: any) => ({
            title: item.prfnm, // 공연명
            fcltynm: item.fcltynm, //공연장명
            prfcast: item.prfcast, //출연진
            period: `${item.prfpdfrom}~${item.prfpdto}`, //공연기간
            prfruntime: item.prfruntime, //런타임
            dtguidance: item.dtguidance, //공연요일
            prfage: item.prfage, //관람연령
            pcseguidance: item.pcseguidance, //티켓가격
            poster: item.poster, //포스터
            styurls: item.styurls, //소개이미지
            relates: item.relates.relate, //예매처목록

        }));
        return Response.json({ ok: true, count: performances.length, performances });
    } catch (err: any) {
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}