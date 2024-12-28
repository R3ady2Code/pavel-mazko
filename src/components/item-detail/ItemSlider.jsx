import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";

const ItemSlider = ({ photos, coverImg }) => {
    const [activeImage, setActiveImage] = useState(null);
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
            {activeImage && (
                <div class="fullpic" onClick={() => setActiveImage(null)}>
                    <img src={activeImage} alt="" onClick={(e) => e.stopPropagation()} />
                    <div className="fullpic__btn-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                            <rect
                                x="1.75415"
                                y="0.840027"
                                width="14"
                                height="2"
                                transform="rotate(45 1.75415 0.840027)"
                                fill="white"
                            />
                            <rect
                                x="0.339966"
                                y="10.7395"
                                width="14"
                                height="2"
                                transform="rotate(-45 0.339966 10.7395)"
                                fill="white"
                            />
                        </svg>
                    </div>
                </div>
            )}
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
                        <div className="item-card__cover" onClick={() => setActiveImage(src)}>
                            <img src={src} alt={`Slide ${index + 1}`} />
                        </div>
                    </SwiperSlide>
                ))}

                {displayedPhotos.length > 1 && (
                    <div className="swiper-arrows">
                        <div className="swiper-arrows__left" onClick={() => sliderRef.current?.slidePrev()}>
                            ←
                        </div>
                        <div className="swiper-arrows__right" onClick={() => sliderRef.current?.slideNext()}>
                            →
                        </div>
                    </div>
                )}
            </Swiper>
        </>
    );
};

export default ItemSlider;
