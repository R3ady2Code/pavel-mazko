import React from "react";
import CatalogItem from "./CatalogItem";

const CatalogList = ({ items }) => {
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
