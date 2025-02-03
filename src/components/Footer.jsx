import React, { useMemo } from "react";

const Footer = () => {
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return <footer className="footer">© {currentYear}, Pavel Mazko</footer>;
};

export default Footer;
