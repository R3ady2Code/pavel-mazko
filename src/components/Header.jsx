import React from "react";
import { Link } from "react-router-dom";
import logoSrc from "../assets/Logo.png";

const Header = ({ isCardDetail }) => {
    return (
        <header className="header">
            <Link to={isCardDetail ? "/catalog" : "/"} className="header__link">
                {isCardDetail ? "Каталог" : "Главная"}
            </Link>
            <Link to="/" className="header__logo">
                <img src={logoSrc} alt="" />
            </Link>
            <a href="https://t.me/pavelmazkosupport" target="_blank" className="header__link">
                Вопросы
            </a>
        </header>
    );
};

export default Header;
