import { fetchXml, toArray, getRecentDateRange } from "@/lib/server/xmlFetch";
import { Vibrant } from "node-vibrant/node";

export const revalidate = 3600; // 1시간마다 재검증 (원본 API도 자주 안 바뀌니까)

// 서버 인스턴스가 살아있는 동안 재계산 방지 (동일 이미지 재요청 시 즉시 반환)
const colorCache = new Map<string, string[]>();

async function getGradientColors(imageUrl: string): Promise<string[]> {
  if (colorCache.has(imageUrl)) {
    return colorCache.get(imageUrl)!;
  }

  try {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`이미지 요청 실패: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());

    // quality를 낮춰서 샘플링 속도를 올림 (기본값보다 가볍게)
    const palette = await Vibrant.from(buffer).quality(5).getPalette();

    const primary = palette.Vibrant?.hex ?? palette.Muted?.hex ?? "#333333";
    const secondary = palette.DarkVibrant?.hex ?? palette.DarkMuted?.hex ?? "#111111";

    const colors = [primary, secondary];
    colorCache.set(imageUrl, colors);
    return colors;
  } catch (err) {
    console.error("색상 추출 실패:", imageUrl, err);
    const fallback = ["#333333", "#111111"];
    colorCache.set(imageUrl, fallback);
    return fallback;
  }
}

export async function GET() {
  const Key = process.env.SEOUL_KEY;
  try {
    if (!Key) throw new Error("SEOUL_KEY 환경변수가 설정되지 않았습니다.");

    let url = `http://openapi.seoul.go.kr:8088/${Key}/xml/culturalEventInfo/1/10/`;

    const parsed = await fetchXml(url);
    const list = toArray(parsed?.culturalEventInfo?.row);

    const performances = await Promise.all(
      list.map(async (item: any) => {
        const poster = item.MAIN_IMG;
        const gradientColors = poster
          ? await getGradientColors(poster)
          : ["#333333", "#111111"];

        return {
          codename: item.CODENAME,
          guname: item.GUNAME,
          title: item.TITLE,
          date: item.DATE,
          place: item.PLACE,
          poster,
          gradientColors, // [primary, secondary]
        };
      })
    );

    return Response.json({ ok: true, count: performances.length, performances });
  } catch (err: any) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}