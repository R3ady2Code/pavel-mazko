import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ItemSlider from "../components/item-detail/ItemSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, selectItemById } from "../redux/itemsSlice";
import { useParams } from "react-router-dom";

import "../styles/item-detail.scss";
import MoreSlider from "../components/item-detail/MoreSlider";
import Loader from "../components/Loader";

const ItemDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const item = useSelector((state) => selectItemById(state, id));
    const { items, status } = useSelector((state) => state.items);

    const [isLoaderVisible, setLoaderVisible] = useState(true);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0
        });
    };

    useEffect(() => {
        handleScrollToTop();
    }, []);

    useEffect(() => {
        if (status === "idle" || !item) {
            dispatch(fetchItems());
        }

        if (status === "succeeded") {
            const timer = setTimeout(() => setLoaderVisible(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [status, dispatch, item]);

    return (
        <>
            {isLoaderVisible && (
                <div className={`loader-container ${status === "succeeded" ? "fade-out" : ""}`}>
                    <Loader />
                </div>
            )}
            <Header isCardDetail={true} />
            <main className="item-detail__main">
                {item && (
                    <>
                        <section className="item-card with__max-width">
                            <div className="item-card__left">
                                <div className="product-item__title">
                                    <h4>{item.subtitle}</h4>
                                    <h3>{item.title}</h3>
                                </div>

                                <div
                                    className="item-card__description"
                                    dangerouslySetInnerHTML={{
                                        __html: item.description
                                    }}
                                />
                            </div>
                            <ItemSlider photos={item.imgSources} coverImg={item.coverImg} />
                            <div className="item-card__right">
                                <div className="item-card__ui">
                                    <span className="item-card__price">₽ {item.price}</span>

                                    <a
                                        href="https://t.me/pavelmazkosupport"
                                        target="_blank"
                                        className="item-card__button"
                                    >
                                        перейти к оформлению
                                    </a>

                                    <ul className="item-card__properties">
                                        {item.properties?.map((prop, i) => (
                                            <li key={i}>
                                                {prop.key}: {prop.value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="item-card__mobile">
                                <div className="product-item__info">
                                    <div className="product-item__title">
                                        <h4>{item.subtitle}</h4>
                                        <h3>{item.title}</h3>
                                    </div>

                                    <span>₽ {item.price}</span>
                                </div>

                                <a href="https://t.me/pavelmazkosupport" target="_blank" className="item-card__button">
                                    перейти к оформлению
                                </a>

                                <div
                                    className="item-card__description"
                                    dangerouslySetInnerHTML={{
                                        __html: item.description
                                    }}
                                />

                                <ul className="item-card__properties">
                                    {item.properties?.map((prop, i) => (
                                        <li key={i}>
                                            {prop.key}: {prop.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                        <h2 className="main-title main-title_detail">ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ</h2>
                        <MoreSlider items={items} />
                    </>
                )}
            </main>
            <Footer />
        </>
    );
};

export default ItemDetail;
