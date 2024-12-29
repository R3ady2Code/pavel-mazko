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

    return (
        <a
            href={`/catalog/${item.id}`}
            className="more-slide"
            key={item.id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="image-wrapper">
                {item.imgSources.length > 1 ? (
                    <>
                        <img
                            src={item.coverImg}
                            alt="First"
                            className={`image ${isOnMouse ? "fade-out" : "fade-in"}`}
                        />
                        <img
                            src={item.secondSrc}
                            alt="Second"
                            className={`image second ${isOnMouse ? "fade-in scale-up" : "fade-out"}`}
                        />
                    </>
                ) : (
                    <img src={item.coverImg} alt="First" className={`image fade-in`} />
                )}
            </div>
        </a>
    );
};

export default MoreSlide;
