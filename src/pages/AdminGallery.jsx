import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGalleryImage, fetchGallery, uploadGalleryImage } from "../redux/itemsSlice";
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

        setImages((prevImages) => [...prevImages, ...files]);
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

    const handleRemoveFromGallery = (image) => {
        dispatch(deleteGalleryImage(image));
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
                            onClick={() => handleRemoveFromGallery(image)}
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
