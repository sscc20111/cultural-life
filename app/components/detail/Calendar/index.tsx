"use client";
import React, { useMemo, useState } from "react";

/**
 * "2026.09.05~2026.09.06" 형태의 문자열을 { start, end } Date 객체로 파싱
 */
function parseDateRange(rangeStr: string): { start: Date; end: Date } {
  const [startStr, endStr] = rangeStr.split("~").map((s) => s.trim());

  const toDate = (s: string) => {
    const [y, m, d] = s.split(".").map(Number);
    return new Date(y, m - 1, d);
  };

  return { start: toDate(startStr), end: toDate(endStr) };
}

/** 시간 정보를 무시하고 연/월/일만 비교하기 위한 헬퍼 */
function toDayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

/** 특정 날짜가 [start, end] 범위(양 끝 포함) 안에 있는지 체크 */
function isInRange(date: Date, start: Date, end: Date): boolean {
  const key = toDayKey(date);
  const startKey = toDayKey(start);
  const endKey = toDayKey(end);
  // 문자열 비교 대신 timestamp 비교 (자정 기준으로 맞춘 값끼리 비교)
  const t = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return t >= s && t <= e;
}

// [추가] 두 날짜가 연/월/일 기준으로 같은 날인지 체크하는 헬퍼 (오늘 날짜 하이라이트용)
function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
}

const WEEK_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

/** 주어진 연/월 기준으로 달력 그리드(6주 X 7일 형태의 셀 배열) 생성 */
function buildCalendarGrid(year: number, month: number): CalendarCell[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startWeekday = firstDayOfMonth.getDay(); // 0(일) ~ 6(토)
  const daysInMonth = lastDayOfMonth.getDate();

  const cells: CalendarCell[] = [];

  // 이전 달 채우기 (앞쪽 빈 칸)
  for (let i = startWeekday - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    cells.push({ date, isCurrentMonth: false });
  }

  // 현재 달 채우기
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }

  // 다음 달 채우기 (7의 배수로 맞추기)
  while (cells.length % 7 !== 0) {
    const lastDate = cells[cells.length - 1].date;
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + 1);
    cells.push({ date: nextDate, isCurrentMonth: false });
  }

  return cells;
}

interface DetailCalendarProps {
  /** "2026.09.05~2026.09.06" 형태의 예약(하이라이트) 날짜 범위 */
  reservedRange: string;
}

export default function DetailCalendar({ reservedRange }: DetailCalendarProps) {
  const { start, end } = useMemo(() => parseDateRange(reservedRange), [reservedRange]);

  // [추가] 오늘 날짜를 한 번만 계산해서 재사용 (렌더링마다 새로 생성되지 않도록 useMemo 사용)
  const today = useMemo(() => new Date(), []);

  // [수정] 초기 표시 월을 reservedRange의 시작월이 아닌 "오늘이 속한 월"로 변경
  const [viewDate, setViewDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const cells = useMemo(() => buildCalendarGrid(year, month), [year, month]);

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <div className="w-[280px] rounded-3xl bg-white p-6 shadow-md">
      {/* 상단 헤더: 월 이동 */}
      <div className="mb-5 flex items-center justify-center gap-6">
        <button
          onClick={goPrevMonth}
          className="text-gray-400 hover:text-gray-600"
          aria-label="이전 달"
        >
          &lt;
        </button>
        <span className="text-lg font-bold text-gray-900">
          {year}.{String(month + 1).padStart(2, "0")}
        </span>
        <button
          onClick={goNextMonth}
          className="text-gray-400 hover:text-gray-600"
          aria-label="다음 달"
        >
          &gt;
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="mb-2 grid grid-cols-7 text-center text-sm font-medium">
        {WEEK_LABELS.map((label, idx) => (
          <div
            key={label}
            className={
              idx === 0
                ? "text-red-400"
                : idx === 6
                ? "text-blue-400"
                : "text-gray-700"
            }
          >
            {label}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-3 text-center text-sm">
        {cells.map(({ date, isCurrentMonth }, idx) => {
          const weekday = idx % 7;
          const inRange = isInRange(date, start, end);
          // [추가] 오늘 날짜 여부 체크
          const isToday = isSameDay(date, today);

          // 요일별 기본 색상 (일요일 빨강, 토요일 파랑, 나머지 검정)
          const baseColor =
            weekday === 0
              ? "text-red-400"
              : weekday === 6
              ? "text-blue-400"
              : "text-gray-800";

          return (
            <div
              key={idx}
              // 핵심 로직: range에 포함된 날짜만 opacity 1, 그 외는 0.2
              style={{ opacity: inRange ? 1 : 0.2 }}
              className="py-1"
            >
              {/* [수정] 날짜 숫자를 span으로 감싸고, 오늘이면 원형 배경으로 하이라이트 */}
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${baseColor} ${
                  isToday ? "bg-gray-600 !text-white font-bold" : ""
                }`}
              >
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}