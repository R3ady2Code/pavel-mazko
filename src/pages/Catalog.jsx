import { useEffect, useState } from "react";
import CatalogList from "../components/catalog/CatalogList";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/catalog.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../redux/itemsSlice";
import Loader from "../components/Loader";

const Catalog = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.items);

    // const [isLoaderVisible, setLoaderVisible] = useState(true);

    // useEffect(() => {
    //     if (status === "idle") {
    //         dispatch(fetchItems());
    //     }

    //     if (status === "succeeded") {
    //         // Set timeout to allow animation to complete
    //         const timer = setTimeout(() => setLoaderVisible(false), 1000); // Adjust timing if necessary
    //         return () => clearTimeout(timer);
    //     }
    // }, [status, dispatch]);

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
