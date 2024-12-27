import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import "swiper/css/mousewheel";

const PhotosGallery = () => {
    const [isAlreadyUse, setIsAlreadyUse] = useState(false);
    const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);

    const { gallery, status, error } = useSelector((state) => state.items);
    const swiperRef = useRef(null);

    const handleImagesLoad = () => {
        const images = Array.from(document.querySelectorAll(".gallery-swiper__item img"));
        let loadedCount = 0;

        images.forEach((img) => {
            if (img.complete) {
                loadedCount += 1;
            } else {
                img.onload = () => {
                    loadedCount += 1;
                    if (loadedCount === images.length) {
                        setIsAllImagesLoaded(true);
                    }
                };
                img.onerror = () => {
                    loadedCount += 1;
                    if (loadedCount === images.length) {
                        setIsAllImagesLoaded(true);
                    }
                };
            }
        });

        if (loadedCount === images.length) {
            setIsAllImagesLoaded(true);
        }
    };

    useEffect(() => {
        if (gallery.length > 0) {
            handleImagesLoad();
        }
    }, [gallery]);

    const slideChange = (swiper) => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
            setIsAlreadyUse(true);
        }
    };

    const onSwiper = () => {
        setIsAlreadyUse(true);
    };

    return (
        <>
            {isAllImagesLoaded && (
                <Swiper
                    slidesPerView={"auto"}
                    loop={true}
                    className="gallery-swiper"
                    mousewheel={true}
                    ref={swiperRef}
                    spaceBetween={0}
                    modules={[Mousewheel]}
                    slideToClickedSlide={true}
                    onScroll={onSwiper}
                    onTouchMove={onSwiper}
                >
                    {gallery.map((img, index) => (
                        <SwiperSlide key={index} className="gallery-swiper__item">
                            <img src={img} alt={`Image ${index}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {!isAlreadyUse &&
                isAllImagesLoaded && ( // Показываем кнопку только после загрузки всех изображений
                    <button className="photo-gallery__slide" onClick={slideChange}>
                        <span>Листать</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                            <path
                                d="M0.583008 7.99989H12.5001M7.00013 1.58276L13.4173 7.99989L7.00013 14.417"
                                stroke="white"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>
                )}
        </>
    );
};

export default PhotosGallery;
