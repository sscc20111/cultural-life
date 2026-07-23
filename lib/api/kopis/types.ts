export type RankingItem = {// 공연 랭킹 항목의 타입 정의
    rank: string;// 공연 랭킹
    id: string;// 공연 ID
    title: string;// 공연 제목
    period: string;// 공연 기간
    genre: string;// 공연 장르
    area: string;// 공연 지역
    venue: string;// 공연 장소
    poster: string;// 공연 포스터 이미지 URL
};

export type FestivalItem = {// 공연 축제 항목의 타입 정의
    id: string;// 공연 ID
    title: string;// 공연 제목
    period: string;// 공연 기간
    venue: string;// 공연 장소
    poster: string;// 공연 포스터 이미지 URL
    genre: string;// 공연 장르
};