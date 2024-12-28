import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "../redux/itemsSlice";
import Loader from "../components/Loader";
import PhotosGallery from "../components/gallery/PhotosGallery";
import VideoGallery from "../components/gallery/VideoGallery";

import "../styles/gallery.scss";
import { Link } from "react-router-dom";

const Gallery = () => {
    const [isPhotoGallery, setIsPhotoGallery] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 756);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 756);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
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
                        {isMobile ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="13"
                                viewBox="0 0 12 13"
                                fill="none"
                            >
                                <rect
                                    x="1.75415"
                                    y="0.840027"
                                    width="14"
                                    height="2"
                                    transform="rotate(45 1.75415 0.840027)"
                                    fill="white"
                                />
                                <rect
                                    x="0.339966"
                                    y="10.7395"
                                    width="14"
                                    height="2"
                                    transform="rotate(-45 0.339966 10.7395)"
                                    fill="white"
                                />
                            </svg>
                        ) : (
                            "Закрыть"
                        )}
                    </Link>
                </div>
            </main>
        </>
    );
};

export default Gallery;
