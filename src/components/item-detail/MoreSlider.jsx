import React, { useEffect, useRef, useState } from "react";
import MoreSlide from "./MoreSlide";

const MoreSlider = ({ items }) => {
    const contentRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - currentTranslate);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const newTranslate = e.pageX - startX;
        setCurrentTranslate(newTranslate);
        contentRef.current.style.transform = `translateX(${newTranslate}px)`;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
        contentRef.current.classList.remove("marquee_no-anime");
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        contentRef.current.classList.add("marquee_no-anime");
        setIsDragging(true);
        setStartX(touch.pageX - currentTranslate);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        const newTranslate = touch.pageX - startX;
        setCurrentTranslate(newTranslate);
        contentRef.current.style.transform = `translateX(${newTranslate}px)`;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="marquee-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="marquee " ref={contentRef}>
                {new Array(10).fill(0).map((i) => items?.map((item, index) => <MoreSlide key={index} item={item} />))}
            </div>
        </div>
    );
};

export default MoreSlider;
