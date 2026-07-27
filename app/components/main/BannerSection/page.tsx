"use client";
import { useEffect, useState, useMemo } from "react";


export default function BannerSection() {
    const [bannerData, setBannerData] = useState<any[]>([]);

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const res = await fetch("/api/seoul");
                const data = await res.json();
                if (!data.ok) throw new Error(data.error ?? "데이터를 불러오지 못했습니다.");
                setBannerData(data.performances);
                console.log("Banner Data:", data);
            } catch (err: any) {
                console.error("Error fetching banner data:", err.message);
            }
        };

        fetchBannerData();
    }, []);
    useEffect(() => {
        console.log("Banner Data Updated:", bannerData);
    }, [bannerData]);

    return (
        <div className="banner">
            {bannerData?.map((item) => (
                <div key={item.title} className="banner-item">
                    <img src={item.poster} alt={item.title} />
                    <div className="banner-info">
                        <h3>{item.title}</h3>
                        <p>{item.date}</p>
                        <p>{item.place}</p>
                    </div>
                </div> 
            ))}
        </div>
    );
}"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<culturalEventInfo>\n<list_total_count>19459</list_total_count>\n<RESULT>\n<CODE>INFO-000</CODE>\n<MESSAGE>정상 처리되었습니다</MESSAGE>\n</RESULT>\n<row>\n<CODENAME>콘서트</CODENAME>\n<GUNAME>강동구</GUNAME>\n<TITLE>2026 카즈미 타테이시 트리오 내한공연-크리스마스, 재즈를 만나다-(서울)</TITLE>\n<DATE>2026-12-24~2026-12-24</DATE>\n<PLACE>강동아트센터 대극장 한강</PLACE>\n<ORG_NAME>기타</ORG_NAME>\n<USE_TRGT>성인, 청소년</USE_TRGT>\n<USE_FEE>VIP석 88,000원 / R석 77,000원 / S석 66,000원 / A석 55,000원</USE_FEE>\n<INQUIRY>070-8680-8477 / 02-337-3103</INQUIRY>\n<PLAYER>Piano : Kazumi Tateishi, Contrabass : Shinobu Sato, Drums : Mao Suzuki</PLAYER>\n<PROGRAM>Let It Snow, White Christmas 등 크리스마스 캐롤 명곡을 피아노, 콘트라베이스, 드럼의 일본 재즈 트리오 연주로 듣는 공연</PROGRAM>\n<ETC_DESC/>\n<ORG_LINK>https://tickets.interpark.com/goods/26010350</ORG_LINK>\n<MAIN_IMG>https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=401a984b98ff4af8a57122219ee0d591&amp;thumb=Y</MAIN_IMG>\n<RGSTDATE>2026-07-23</RGSTDATE>\n<TICKET>시민</TICKET>\n<STRTDATE>2026-12-24 00:00:00.0</STRTDATE>\n<END_DATE>2026-12-24 00:00:00.0</END_DATE>\n<THEMECODE>기타</THEMECODE>\n<LOT>127.157342546961</LOT>\n<LAT>37.5512204558342</LAT>\n<IS_FREE>유료</IS_FREE>\n<HMPG_ADDR>https://culture.seoul.go.kr/culture/culture/cultureEvent/view.do?cultcode=158770&amp;menuNo=200008</HMPG_ADDR>\n<PRO_TIME>19:30</PRO_TIME>\n</row>\n<row>\n<CODENAME>콘서트</CODENAME>\n<GUNAME>영등포구</GUNAME>\n<TITLE>2026 카즈미 타테이시 트리오 내한공연-지브리, 재즈를 만나다-(서울)</TITLE>\n<DATE>2026-12-22~2026-12-22</DATE>\n<PLACE>영등포아트홀</PLACE>\n<ORG_NAME>기타</ORG_NAME>\n<USE_TRGT>성인, 청소년</USE_TRGT>\n<USE_FEE>VIP석 88,000원 / R석 77,000원 / S석 66,000원</USE_FEE>\n<INQUIRY>070-8680-8477 / 02-337-3103</INQUIRY>\n<PLAYER>Piano : Kazumi Tateishi, Contrabass : Shinobu Sato, Drums : Mao Suzuki</PLAYER>\n<PROGRAM>이웃집 토토로, 하울의 움직이는 성 등 지브리 애니메이션의 명곡을 피아노, 콘트라베이스, 드럼의 일본 재즈 트리오 연주로 듣는 공연</PROGRAM>\n<ETC_DESC/>\n<ORG_LINK>https://tickets.interpark.com/goods/26010060</ORG_LINK>\n<MAIN_IMG>https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=ae89ba10b5c64459b3e2fe3942048f84&amp;thumb=Y</MAIN_IMG>\n<RGSTDATE>2026-07-16</RGSTDATE>\n<TICKET>시민</TICKET>\n<STRTDATE>2026-12-22 00:00:00.0</STRTDATE>\n<END_DATE>2026-12-22 00:00:00.0</END_DATE>\n<THEMECODE>기타</THEMECODE>\n<LOT>126.900109255921</LOT>\n<LAT>37.5260087284496</LAT>\n<IS_FREE>유료</IS_FREE>\n<HMPG_ADDR>https://culture.seoul.go.kr/culture/culture/cultureEvent/view.do?cultcode=158691&amp;menuNo=200008</HMPG_ADDR>\n<PRO_TIME>19:30</PRO_TIME>\n</row>\n<row>\n<CODENAME>전시/미술</CODENAME>\n<GUNAME>중구</GUNAME>\n<TITLE>파인캐릭터 2026 (FineCharacter 2026)</TITLE>\n<DATE>2026-11-27~2026-11-29</DATE>\n<PLACE>동대문디자인플라자(DDP) 쇼룸 1층 (서울 중구 을지로 281)</PLACE>\n<ORG_NAME>기타</ORG_NAME>\n<USE_TRGT>누구나</USE_TRGT>\n<USE_FEE/>\n<INQUIRY>031-921-6325</INQUIRY>\n<PLAYER/>\n<PROGRAM/>\n<ETC_DESC/>\n<ORG_LINK>https://finecharacter.kr/</ORG_LINK>\n<MAIN_IMG>https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=f941d1c83dad4804b0f02fc3817af386&amp;thumb=Y</MAIN_IMG>\n<RGSTDATE>2026-07-21</RGSTDATE>\n<TICKET>시민</TICKET>\n<STRTDATE>2026-11-27 00:00:00.0</STRTDATE>\n<END_DATE>2026-11-29 00:00:00.0</END_DATE>\n<THEMECODE>기타</THEMECODE>\n<LOT>127.00977973484339</LOT>\n<LAT>37.56735731522952</LAT>\n<IS_FREE>무료</IS_FREE>\n<HMPG_ADDR>https://culture.seoul.go.kr/culture/culture/cultureEvent/view.do?cultcode=158731&amp;menuNo=200009</HMPG_ADDR>\n<PRO_TIME>10:00 ~ 19:00</PRO_TIME>\n</row>\n<row>\n<CODENAME>콘서트</CODENAME>\n<GUNAME>강북구</GUNAME>\n<TITLE>[꿈의숲아트센터] 꿈의숲 마티네 콘서트 [벨에포크 아트&amp;뮤직] 시리즈3</TITLE>\n<DATE>2026-10-28~2026-10-28</DATE>\n<PLACE>북서울꿈의숲 상상톡톡미술관</PLACE>\n<ORG_NAME>세종문화회관</ORG_NAME>\n<USE_TRGT>8세 이상 관람 가능</USE_TRGT>\n<USE_FEE>전석 15,000원</USE_FEE>\n<INQUIRY>02-399-1000</INQUIRY>\n<PLAYER/>\n<PROGRAM/>\n<ETC_DESC/>\n<ORG_LINK>https://www.sejongpac.or.kr/dfac/dfacPerformance/dfacPerformance/performTicket.do?performIdx=37104&amp;menuNo=1200007</ORG_LINK>\n<MAIN_IMG>https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=75a26c72552b4b38acca7be54e15cf8b&amp;thumb=Y</MAIN_IMG>\n<RGSTDATE>2026-06-30</RGSTDATE>\n<TICKET>기관</TICKET>\n<STRTDATE>2026-10-28 00:00:00.0</STRTDATE>\n<END_DATE>2026-10-28 00:00:00.0</END_DATE>\n<THEMECODE>기타</THEMECODE>\n<LOT>127.044324732036</LOT>\n<LAT>37.6202544613023</LAT>\n<IS_FREE>유료</IS_FREE>\n<HMPG_ADDR>https://culture.seoul.go.kr/culture/culture/cultureEvent/view.do?cultcode=158447&amp;menuNo=200008</HMPG_ADDR>\n<PRO_TIME>수요일 11:00</PRO_TIME>\n</row>\n<row>\n<CODENAME>클래식</CODENAME>\n<GUNAME>마포구</GUNAME>\n<TITLE>[마포문화재단] 제11회 M 클래식 축제 [뮤라벨 콘서트]</TITLE>\n<DATE>2026-10-28~2026-10-28</DATE>\n<PLACE>마포아트센터 플레이맥</PLACE>\n<ORG_NAME>마포문화재단</ORG_NAME>\n<USE_TRGT>8세이상 관람가능</USE_TRGT>\n<USE_FEE>전석 20,000원</USE_FEE>\n<INQUIRY>02-3274-8600 [문의1번] 평일 9:00 - 18:00 (토,일 공휴일 휴무)</INQUIRY>\n<PLAYER/>\n<PROGRAM/>\n<ETC_DESC/>\n<ORG_LINK>https://www.mfac.or.kr/performance/whole_view.jsp?sc_b_category=17&amp;sc_b_code=BOARD_1207683401&amp;pk_seq=2675&amp;page=1</ORG_LINK>\n<MAIN_IMG>https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=d0069ec8a15440cf83bea9a06775367a&amp;thumb=Y</MAIN_IMG>\n<RGSTDATE>2026-07-08</RGSTDATE>\n<TICKET>기관</TICKET>\n<STRTDATE>2026-10-28 00:00:00.0</STRTDATE>\n<END_DATE>2026-10-28 00:00:00.0</END_DATE>\n<THEMECODE>기타</THEMECODE>\n<LOT>126.945533810385</LOT>\n<LAT>37.5499060881738</LAT>\n<IS_FREE>유료</IS_FREE>\n<HMPG_ADDR>https://culture.seoul.go.kr/culture/culture/cultureEvent/view.do?cultcode=158566&amp;menuNo=200008</HMPG_ADDR>\n<PRO_TIME>(수) 19:30</PRO_TIME>\n</row>\n</culturalEventInfo>\n"