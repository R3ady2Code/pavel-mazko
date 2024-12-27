import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CatalogItem from "./CatalogItem";
import { setStatus } from "../../redux/itemsSlice";

const CatalogList = ({ items }) => {
    const dispatch = useDispatch();

    return (
        <div className="catalog-list">
            {items.map((item, i) => (
                <div className="catalog-list__item" key={item.id}>
                    <CatalogItem key={i} {...item} />
                </div>
            ))}
        </div>
    );
};

export default CatalogList;
