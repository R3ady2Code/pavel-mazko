import React, { useEffect, useRef, useState } from "react";
import MoreSlide from "./MoreSlide";

const MoreSlider = ({ items }) => {
    return (
        <div className="marquee-container">
            <div className="marquee">
                {new Array(10).fill(0).map((i) => items?.map((item, index) => <MoreSlide key={index} item={item} />))}
            </div>
        </div>
    );
};

export default MoreSlider;
