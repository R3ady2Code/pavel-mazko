import CatalogList from "../components/catalog/CatalogList";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/catalog.scss";
import { useSelector } from "react-redux";

const Catalog = () => {
    const { items } = useSelector((state) => state.items);

    return (
        <>
            <Header />
            <main className="main__max-width">
                <CatalogList items={items} />
            </main>
            <Footer />
        </>
    );
};

export default Catalog;
