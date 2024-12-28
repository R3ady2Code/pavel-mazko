import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, updateItem, uploadImage } from "../../../redux/itemsSlice";
import imageCompression from "browser-image-compression";

const ProductForm = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [properties, setProperties] = useState([{ key: "Материал", value: "Шерсть" }]);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = async (e) => {
        const files = e.target.files;
        const compressedImages = [];

        for (let file of files) {
            try {
                const options = {
                    maxSizeMB: 0.2, // Maximum file size (1MB in this case)
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

    const handleCoverImageChange = (index) => {
        setCoverImage(images[index]);
    };

    const resetAllStates = () => {
        setTitle("");
        setSubtitle("");
        setPrice("");
        setDescription("");
        setImages([]);
        setCoverImage(null);
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (!images.length || !coverImage) {
            setIsLoading(false);
            return alert("Выберите фотографию товара");
        }

        const newItem = {
            title,
            subtitle,
            price,
            description,
            properties,
            imgSources: []
        };
        const dbItem = await dispatch(addItem(newItem));

        await Promise.all(
            images.map(async (file) => {
                const isCover = file.name === coverImage.name;
                return await dispatch(uploadImage({ file, itemId: dbItem.payload.id, isCover }));
            })
        );

        alert("Загрузка завершена");
        resetAllStates();
        setIsLoading(false);
    };

    // Функция для изменения значения поля key или value
    const handleInputChange = (index, field, value) => {
        const newProperties = [...properties];
        newProperties[index][field] = value;
        setProperties(newProperties);
    };

    // Функция для добавления новой пары
    const handleAddPair = () => {
        setProperties([...properties, { key: "", value: "" }]);
    };

    // Функция для удаления пары по индексу
    const handleRemovePair = (index) => {
        const newProperties = properties.filter((_, i) => i !== index);
        setProperties(newProperties);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2 className="product-form__title">Добавить товар</h2>
            <div className="product-form__flex">
                <div className="product-form__form">
                    <input
                        type="text"
                        className="product-form__input"
                        placeholder="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        className="product-form__input"
                        placeholder="Категория"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                    <input
                        type="text"
                        className="product-form__input"
                        placeholder="Цена (не форматируется)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <textarea
                        className="product-form__textarea"
                        placeholder="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="file"
                        className="product-form__file-input"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>
                <div className="key-value-editor">
                    <h3 className="editor-title">Редактирование свойств</h3>
                    {properties.map((pair, index) => (
                        <div key={index} className="property-row">
                            <input
                                type="text"
                                value={pair.key}
                                placeholder="Key"
                                onChange={(e) => handleInputChange(index, "key", e.target.value)}
                                className="input-key"
                            />
                            <input
                                type="text"
                                value={pair.value}
                                placeholder="Value"
                                onChange={(e) => handleInputChange(index, "value", e.target.value)}
                                className="input-value"
                            />
                            <button onClick={() => handleRemovePair(index)} className="remove-button">
                                Удалить
                            </button>
                        </div>
                    ))}
                    <button onClick={handleAddPair} className="add-button">
                        Добавить пару
                    </button>
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
                        <button
                            type="button"
                            className={`product-form__cover-image ${coverImage === image ? "selected" : ""}`}
                            onClick={() => handleCoverImageChange(index)}
                        >
                            Сделать обложкой
                        </button>
                    </div>
                ))}
            </div>
            <button type="submit" className="product-form__button" disabled={isLoading}>
                Создать
            </button>
        </form>
    );
};

export default ProductForm;
