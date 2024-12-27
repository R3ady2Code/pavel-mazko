import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const CatalogItem = ({ id, title, subtitle, price, secondSrc, coverImg, soldOut }) => {
    const [isOnMouse, setIsOnMouse] = useState(false);

    const handleMouseEnter = () => {
        setIsOnMouse(true);
    };

    const handleMouseLeave = () => {
        setIsOnMouse(false);
    };

    return (
        <Link
            className={soldOut ? "product-item product-item_sold" : "product-item"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            to={`/catalog/${id}`}
        >
            <div className="product-item__cover">
                {isOnMouse ? <img src={secondSrc} alt="" /> : <img src={coverImg} alt="" />}

                <span className="product-item__span">Sold out</span>
            </div>
            <div className="product-item__info">
                <div className="product-item__title">
                    <h4>{subtitle}</h4>
                    <h3>{title}</h3>
                </div>

                <span>₽ {price}</span>
            </div>
        </Link>
    );
};

export default CatalogItem;
