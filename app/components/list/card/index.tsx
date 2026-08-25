// app/components/list/ListCard.tsx

import Link from "next/link";

interface CardProps {
    rank?: number,
    id: string;
    title: string;
    period: string;
    venue: string;
    poster: string;
    genre: string;
}

export default function ListCard({ items }: { items: CardProps[] }) {
    return (
        <ul className="max-w-[1200px] mx-auto px-6 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-6 list-none">
            {items.map((item) => (
                <li key={item.id} className="flex flex-col">
                    <Link href={`/detail/kopis/${item.id}`} className="w-full">
                        <div className="w-full aspect-[3/4] overflow-hidden rounded-md bg-gray-100 border border-gray-200">
                            <img
                                src={item.poster}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            />
                        </div>
                        {item.period && (
                            <p className="mt-2.5 text-sm font-bold text-blue-600">{item.period}</p>
                        )}
                        <h2 className="mt-1 text-sm font-semibold text-black leading-snug line-clamp-2 break-keep">
                            {item.title}
                        </h2>
                        <p className="mt-1 text-xs text-gray-500">{item.venue}</p>
                        {(item as any).badges?.length > 0 && (
                            <div className="mt-1.5 flex gap-1.5 flex-wrap">
                                {(item as any).badges.map((badge: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className={`text-[11px] px-2 py-0.5 rounded ${
                                            badge === "HOT"
                                                ? "bg-red-100 text-red-500 font-bold"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        )}
                    </Link>
                </li>
            ))}
        </ul>
    );
}