// app/components/list/card.tsx
// 수정: ul/li 구조를 전부 div로 변경 (시맨틱 리스트 태그 미사용)

import Link from "next/link";

interface ListCardItem {
    id: string;
    title: string;
    period: string;
    venue: string;
    poster: string;
    genre: string;
    rank?: number;
}

interface CardProps {
    items: ListCardItem[];
}

export default function ListCard({ items }: CardProps) {
    const topItems = items.slice(0, 3);
    const restItems = items.slice(3);

    return (
        <div>
            {/* 수정: ul -> div, 1~3위 3열 그리드 */}
            <div className="max-w-[1200px] mx-auto px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-6">
                {topItems.map((item, index) => (
                    <TopCard key={item.id} item={item} rank={item.rank ?? index + 1} />
                ))}
            </div>

            {/* 수정: ul -> div, 4위 이하 세로 리스트 */}
            <div className="max-w-[1200px] mx-auto px-6">
                {restItems.map((item, index) => (
                    <Row key={item.id} item={item} rank={item.rank ?? index + 4} />
                ))}
            </div>
        </div>
    );
}

function TopCard({ item, rank }: { item: ListCardItem; rank: number }) {
    return (
        // 수정: li -> div
        <div className="flex flex-col min-w-0">
            <Link href={`/detail/kopis/${item.id}`} className="w-full">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-gray-100 border border-gray-200">
                    <span className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">
                        {rank}
                    </span>
                    <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <h2 className="mt-3 text-base font-semibold text-black leading-snug break-keep line-clamp-2 min-h-[2.6em]">
                    {item.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500 truncate">{item.venue}</p>
                <p className="mt-0.5 text-sm text-gray-400 whitespace-nowrap">{item.period}</p>

                {item.genre && (
                    <span className="mt-1.5 w-fit text-[11px] px-2 py-0.5 rounded bg-gray-100 text-gray-500 whitespace-nowrap">
                        {item.genre}
                    </span>
                )}
            </Link>
        </div>
    );
}

function Row({ item, rank }: { item: ListCardItem; rank: number }) {
    return (
        // 수정: li -> div, col-span-full 제거 (그리드 아니므로 불필요)
        <div className="flex items-center gap-4 py-4 border-b border-gray-100">
            <Link href={`/detail/kopis/${item.id}`} className="flex items-center gap-4 w-full">
                <div className="w-8 shrink-0 text-center">
                    <p className="text-lg font-bold text-black">{rank}</p>
                </div>

                <div className="w-14 h-[72px] shrink-0 overflow-hidden rounded bg-gray-100 border border-gray-200">
                    <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0 flex items-center gap-2">
                    {item.genre && (
                        <span className="shrink-0 text-[11px] px-2 py-0.5 rounded bg-gray-100 text-gray-500 whitespace-nowrap">
                            {item.genre}
                        </span>
                    )}
                    <h3 className="text-sm font-semibold text-black truncate break-keep">{item.title}</h3>
                </div>

                <p className="w-40 shrink-0 text-sm text-blue-600 truncate">{item.venue}</p>
                <p className="w-48 shrink-0 text-sm text-gray-500 whitespace-nowrap">{item.period}</p>
            </Link>
        </div>
    );
}