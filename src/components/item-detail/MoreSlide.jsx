import React, { useState } from "react";
import { Link } from "react-router-dom";

const MoreSlide = ({ item }) => {
    const [isOnMouse, setIsOnMouse] = useState(false);

    const handleMouseEnter = () => {
        setIsOnMouse(true);
    };

    const handleMouseLeave = () => {
        setIsOnMouse(false);
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Link
            onClick={handleScrollToTop}
            to={`/catalog/${item.id}`}
            className="more-slide"
            key={item.id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={isOnMouse ? item.secondSrc : item.coverImg} />
        </Link>
    );
};

export default MoreSlide;
