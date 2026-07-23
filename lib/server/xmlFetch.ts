import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({ ignoreAttributes: false, trimValues: true });

export async function fetchXml(url: string) {// 주어진 URL에서 XML 데이터를 가져와 파싱합니다.
    const res = await fetch(url, { cache: "no-store" });
    const xmlText = await res.text();
    return parser.parse(xmlText);
}

export function toArray<T>(value: T | T[] | undefined): T[] {// 주어진 값이 배열인지 확인하고, 배열이 아니면 배열로 변환합니다.
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
}

export function formatDate(date: Date) {// 날짜를 YYYYMMDD 형식으로 변환합니다.
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}${m}${d}`;
}

export function getRecentDateRange(days = 30) {// 오늘 날짜를 기준으로 지정된 일수 전부터 오늘까지의 날짜 범위를 계산합니다.
    const today = new Date();
    const eddate = formatDate(today);
    const past = new Date(today);
    past.setDate(today.getDate() - days);
    const stdate = formatDate(past);
    return { stdate, eddate };
}