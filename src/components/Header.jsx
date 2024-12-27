import React from "react";
import { Link } from "react-router-dom";
import logoSrc from "../assets/Logo.png";

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="header__link">
                Главная
            </Link>
            <div className="header__logo">
                <img src={logoSrc} alt="" />
            </div>
            <a href="https://t.me/pavelmazkosupport" target="_blank" className="header__link">
                Вопросы
            </a>
        </header>
    );
};

export default Header;
