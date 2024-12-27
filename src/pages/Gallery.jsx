import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "../redux/itemsSlice";
import Loader from "../components/Loader";
import PhotosGallery from "../components/gallery/PhotosGallery";
import VideoGallery from "../components/gallery/VideoGallery";

import "../styles/gallery.scss";
import { Link } from "react-router-dom";

const Gallery = () => {
    const dispatch = useDispatch();
    const [isPhotoGallery, setIsPhotoGallery] = useState(true);
    const { gallery, status, error } = useSelector((state) => state.items);

    const [isLoaderVisible, setLoaderVisible] = useState(true);

    // useEffect(() => {
    //     if (status === "idle") {
    //         dispatch(fetchGallery());
    //     }

    //     if (status === "succeeded") {
    //         const timer = setTimeout(() => {
    //             setLoaderVisible(false);
    //             setIsPhotoGallery(false);
    //             setIsPhotoGallery(true);
    //         }, 1000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [status, dispatch]);

    return (
        <>
            {/* {isLoaderVisible && (
                <div className={`loader-container ${status === "succeeded" ? "fade-out" : ""}`}>
                    <Loader />
                </div>
            )} */}
            <main>
                {isPhotoGallery ? <PhotosGallery /> : <VideoGallery />}
                <div className="gallery-ui">
                    <nav className="gallery-ui__nav">
                        <span
                            className={`gallery-ui__nav-item ${isPhotoGallery ? "gallery-ui__nav-item_active" : ""}`}
                            onClick={() => setIsPhotoGallery(true)}
                        >
                            Фото
                        </span>
                        <span
                            className={`gallery-ui__nav-item ${!isPhotoGallery ? "gallery-ui__nav-item_active" : ""}`}
                            onClick={() => setIsPhotoGallery(false)}
                        >
                            Видео
                        </span>
                    </nav>
                    <Link to="/" className="gallery-ui__close">
                        Закрыть
                    </Link>
                </div>
            </main>
        </>
    );
};

export default Gallery;
