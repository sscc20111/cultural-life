import { RankingItem } from "./types";

export async function fetchKopisRanking(): Promise<RankingItem[]> {
    const res = await fetch("/api/kopis/ranking");
    const data = await res.json();
    if (!data.ok) throw new Error(data.error);
    return data.performances;
}