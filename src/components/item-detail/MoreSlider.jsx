import React, { useEffect, useRef, useState } from "react";
import MoreSlide from "./MoreSlide";

const MoreSlider = ({ items }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Скорость перетаскивания
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        const touch = e.touches[0];
        setStartX(touch.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const x = touch.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Скорость перетаскивания
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const container = containerRef.current;

        if (window.innerWidth <= 590) {
            container.addEventListener("touchstart", handleTouchStart);
            container.addEventListener("touchmove", handleTouchMove);
            container.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    return (
        <div
            className="marquee-container"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
        >
            <div className="marquee" ref={contentRef}>
                {new Array(10).fill(0).map((i) => items?.map((item, index) => <MoreSlide key={index} item={item} />))}
            </div>
        </div>
    );
};

export default MoreSlider;
