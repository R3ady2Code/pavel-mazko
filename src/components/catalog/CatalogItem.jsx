import React, { useState } from "react";
import { Link } from "react-router-dom";

const CatalogItem = ({ id, title, subtitle, price, newPrice, secondSrc, imgSources, coverImg, soldOut }) => {
    const [isOnMouse, setIsOnMouse] = useState(false);

    const handleMouseEnter = () => {
        setIsOnMouse(true);
    };

    const handleMouseLeave = () => {
        setIsOnMouse(false);
    };

    return (
        <Link
            className={"product-item"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            to={`/catalog/${id}`}
        >
            <div className="product-item__cover">
                {imgSources.length > 1 ? (
                    <>
                        <img src={coverImg} alt="First" className={`image ${isOnMouse ? "fade-out" : "fade-in"}`} />
                        <img
                            src={secondSrc}
                            alt="Second"
                            className={`image second ${isOnMouse ? "fade-in scale-up" : "fade-out"}`}
                        />
                    </>
                ) : (
                    <img src={coverImg} alt="First" className={`image fade-in`} />
                )}

                {soldOut ? (
                    <label className="product-item__span">Sold out</label>
                ) : newPrice ? (
                    <label className="product-item__span product-item__span_sale">Sale</label>
                ) : null}
            </div>
            <div className="product-item__info">
                <div className="product-item__title">
                    <h4>{subtitle}</h4>
                    <h3>{title}</h3>
                </div>

                {newPrice ? (
                    <div className="product-item__price">
                        <span>₽ {price}</span>
                        <span>₽ {price}</span>
                    </div>
                ) : (
                    <span>₽ {price}</span>
                )}
            </div>
        </Link>
    );
};

export default CatalogItem;
