import React from "react";
import src from "../assets/Logo.png";

const Loader = () => {
    return (
        <div className="loader">
            <img src={src} alt="" className="loader__logo" />
            <p className="loader__text">Загрузка...</p>
        </div>
    );
};

export default Loader;
