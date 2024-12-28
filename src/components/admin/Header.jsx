import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="admin-header">
            <Link to="/yjw48jkxqr/product">Продукты</Link>
            <Link to="/yjw48jkxqr/gallery">Галерея</Link>
        </div>
    );
};

export default Header;
