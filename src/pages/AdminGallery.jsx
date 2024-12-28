import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery, uploadGalleryImage } from "../redux/itemsSlice";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import Header from "../components/admin/Header";

const AdminGallery = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authKey"));

    const gallery = useSelector((state) => state.items.gallery);

    const handleImageChange = async (e) => {
        const files = e.target.files;
        const compressedImages = [];

        for (let file of files) {
            try {
                const options = {
                    maxSizeMB: 0.25, // Maximum file size (1MB in this case)
                    maxWidthOrHeight: 1024, // Maximum width or height
                    useWebWorker: true // Use web worker for better performance
                };
                const compressedFile = await imageCompression(file, options);
                compressedImages.push(compressedFile);
            } catch (error) {
                console.error("Error compressing image:", error);
            }
        }

        setImages((prevImages) => [...prevImages, ...compressedImages]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const resetAllStates = () => {
        setImages([]);
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (!images.length) {
            setIsLoading(false);
            return alert("Выберите фотографии");
        }

        await Promise.all(
            images.map(async (file) => {
                return await dispatch(uploadGalleryImage(file));
            })
        );

        alert("Загрузка завершена");
        resetAllStates();
        setIsLoading(false);
    };

    useEffect(() => {
        if (!isAuthenticated) navigate("/yjw48jkxqr");
    }, []);

    useEffect(() => {
        dispatch(fetchGallery());
    }, [dispatch]);

    return (
        <div className="admin-page">
            <form className="product-form" onSubmit={handleSubmit}>
                <Header />

                <h2 className="product-form__title">Галерея</h2>
                <div className="product-form__flex">
                    <div className="product-form__form">
                        <input
                            type="file"
                            className="product-form__file-input"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <div className="product-form__images-preview">
                    {images.map((image, index) => (
                        <div key={index} className="product-form__image-container">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Uploaded ${index}`}
                                className="product-form__image-preview"
                            />
                            <button
                                type="button"
                                className="product-form__remove-image"
                                onClick={() => handleRemoveImage(index)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>
                <button type="submit" className="product-form__button" disabled={isLoading}>
                    Добавить
                </button>
            </form>

            <div className="gallery-admin">
                {gallery.map((image, index) => (
                    <div key={index} className="product-form__image-container">
                        <img src={image} alt={`Uploaded ${index}`} className="product-form__image-preview" />
                        <button
                            type="button"
                            className="product-form__remove-image"
                            onClick={() => handleRemoveFromGallery(index)}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminGallery;
