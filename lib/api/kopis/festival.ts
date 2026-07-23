import { FestivalItem } from "./types";

export async function fetchKopisFestival(): Promise<FestivalItem[]> {
    const res = await fetch("/api/kopis/festival");
    const data = await res.json();
    if (!data.ok) throw new Error(data.error);
    return data.performances;
}