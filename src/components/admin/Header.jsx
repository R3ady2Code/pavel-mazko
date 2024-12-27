import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="admin-header">
            <Link to="/admin/product">Продукты</Link>
            <Link to="/admin/gallery">Галерея</Link>
        </div>
    );
};

export default Header;
