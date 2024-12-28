import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Gallery from "./pages/Gallery";
import ItemDetail from "./pages/ItemDetail";
import Admin from "./pages/Admin";
import AdminProduct from "./pages/AdminProduct";
import AdminGallery from "./pages/AdminGallery";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery, fetchItems } from "./redux/itemsSlice";
import Loader from "./components/Loader";

function App() {
    const dispatch = useDispatch();
    const [isLoaderVisible, setLoaderVisible] = useState(true);

    const { status } = useSelector((state) => state.items);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchItems());
            dispatch(fetchGallery());
        }

        if (status === "succeeded") {
            // Set timeout to allow animation to complete
            const timer = setTimeout(() => setLoaderVisible(false), 1000); // Adjust timing if necessary
            return () => clearTimeout(timer);
        }
    }, [status, dispatch]);

    return (
        <>
            {isLoaderVisible && (
                <div className={`loader-container ${status === "succeeded" ? "fade-out" : ""}`}>
                    <Loader />
                </div>
            )}
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/catalog/:id" element={<ItemDetail />} />
                    <Route path="/yjw48jkxqr" element={<Admin />} />
                    <Route path="/yjw48jkxqr/product" element={<AdminProduct />} />
                    <Route path="/yjw48jkxqr/gallery" element={<AdminGallery />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
