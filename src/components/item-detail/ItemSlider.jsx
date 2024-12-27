import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";

const ItemSlider = ({ photos, coverImg }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const sliderRef = useRef();

    const displayedPhotos = [coverImg, ...photos.filter((i) => i !== coverImg)];

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slideTo(0);
        }
    });

    return (
        <>
            <Swiper
                slidesPerView={1}
                loop={true}
                onSwiper={(it) => (sliderRef.current = it)}
                className="item-card__swiper"
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current
                }}
                modules={[Navigation, Pagination]}
            >
                {displayedPhotos.map((src, index) => (
                    <SwiperSlide key={index}>
                        <div className="item-card__cover">
                            <img src={src} alt={`Slide ${index + 1}`} />
                        </div>
                    </SwiperSlide>
                ))}

                <div className="swiper-arrows">
                    <div className="swiper-arrows__left" onClick={() => sliderRef.current?.slidePrev()}>
                        ←
                    </div>
                    <div className="swiper-arrows__right" onClick={() => sliderRef.current?.slideNext()}>
                        →
                    </div>
                </div>
            </Swiper>
        </>
    );
};

export default ItemSlider;
