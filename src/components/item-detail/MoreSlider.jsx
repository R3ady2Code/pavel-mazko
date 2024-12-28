import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import MoreSlide from "./MoreSlide";

const MoreSlider = ({ items }) => {
    return (
        <div>
            <Swiper
                slidesPerView={"auto"}
                modules={[Autoplay, FreeMode]}
                className="more-swiper"
                freeMode={true}
                loop={true}
                speed={5000}
                autoplay={{
                    disableOnInteraction: false,
                    delay: 1
                }}
                breakpoints={{
                    790: {
                        allowTouchMove: false
                    }
                }}
            >
                {items?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MoreSlide item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MoreSlider;
