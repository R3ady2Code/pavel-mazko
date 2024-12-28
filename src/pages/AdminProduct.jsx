import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../redux/itemsSlice";

import ProductItem from "../components/admin/Product/ProductItem";
import ProductForm from "../components/admin/Product/ProductForm";
import { useNavigate } from "react-router-dom";
import Header from "../components/admin/Header";

const AdminProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state) => state.items.items);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authKey"));

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    useEffect(() => {
        if (!isAuthenticated) navigate("/yjw48jkxqr");
    }, []);

    return (
        <div className="admin-page">
            <Header />
            <ProductForm />
            <h2 className="admin-page__product-list-title">Продукты</h2>
            {items.map((item) => (
                <ProductItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default AdminProduct;
