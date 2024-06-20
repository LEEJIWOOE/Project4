import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../css/style.css';

import EmissionsChart15 from './Chart_Emissions15';
import EmissionsChart20 from './Chart_Emissions20';
import RecycleChart15 from './Chart_Recycling15';
import RecycleChart20 from './Chart_Recycling20';
import RecycleDetailsChart15 from './Chart_RecyclingDetails15';
import RecycleDetailsChart20 from './Chart_RecyclingDetails20';

import { Pagination } from 'swiper/modules';

const SwiperSlider = ({ serverData15, serverData20 }) => {
    return (
        <Swiper
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={50}
            grabCursor={true}
            pagination={{
                clickable: true,
            }}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className="slide-img1">
                    <EmissionsChart15 data={serverData15} />
                </div>
                <div className="slide-txt">
                    <h6>그림으로 만나는 분리수거</h6>
                    <h2>분리수거를 </h2><h2>쉽게!</h2>
                    <p>그림으로 쉽게 분리수거방법을 볼 수 있습니다. 누구나 쉽게 따라할 수 있는 분리수거입니다.</p>
                    <div className="map-btn">
                        <span>바로가기</span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-img2">
                    <EmissionsChart20 data={serverData20} />
                </div>
                <div className="slide-txt">
                    <h6>내 위치기반 정보제공 서비스</h6>
                    <h2>집 근처 환경관련 서비스를 한눈에</h2>
                    <p>현재 당신의 위치를 기반으로 각종 편의시설의 위치부터 최단거리 길찾기 서비스를 제공합니다.</p>
                    <div className="map-btn">
                        <span>바로가기</span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-img3">
                    <RecycleChart15 data={serverData15} />
                </div>
                <div className="slide-txt">
                    <h6>재활용 현황</h6>
                    <h2>재활용을 </h2><h2>쉽게!</h2>
                    <p>재활용 현황을 쉽게 확인할 수 있습니다.</p>
                    <div className="map-btn">
                        <span>바로가기</span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-img4">
                    <RecycleChart20 data={serverData20} />
                </div>
                <div className="slide-txt">
                    <h6>재활용 현황</h6>
                    <h2>재활용을 </h2><h2>쉽게!</h2>
                    <p>재활용 현황을 쉽게 확인할 수 있습니다.</p>
                    <div className="map-btn">
                        <span>바로가기</span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-img5">
                    <RecycleDetailsChart15 data={serverData15} />
                </div>
                <div className="slide-txt">
                    <h6>상세 재활용 현황</h6>
                    <h2>재활용 품목을 </h2><h2>쉽게!</h2>
                    <p>재활용 품목별 현황을 쉽게 확인할 수 있습니다.</p>
                    <div className="map-btn">
                        <span>바로가기</span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-img6">
                    <RecycleDetailsChart20 data={serverData20} />
                </div>
                <div className="slide-txt">
                    <h6>상세 재활용 현황</h6>
                    <h2>재활용 품목을 </h2><h2>쉽게!</h2>
                    <p>재활용 품목별 현황을 쉽게 확인할 수 있습니다.</p>
                    {/*<div className="map-btn">*/}
                    {/*    /!*<span>바로가기</span>*!/*/}
                    {/*</div>*/}
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default SwiperSlider;
