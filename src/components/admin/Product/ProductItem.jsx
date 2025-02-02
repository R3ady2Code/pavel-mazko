import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, deleteItem, updateItem, uploadImage } from "../../../redux/itemsSlice";

const ProductItem = ({ item }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(item.title);
    const [subtitle, setSubtitle] = useState(item.subtitle);
    const [price, setPrice] = useState(item.price);
    const [newPrice, setNewPrice] = useState(item.newPrice);
    const [description, setDescription] = useState(item.description);
    const [images, setImages] = useState(item.imgSources);
    const [coverImage, setCoverImage] = useState(item.coverImg);
    const [isSoldOut, setIsSoldOut] = useState(item.soldOut ?? false);
    const [properties, setProperties] = useState(item.properties);

    const [newImage, setNewImage] = useState([]);

    const handleUpdateItem = async () => {
        const updatedData = { title, description, subtitle, price, properties, newPrice };
        await dispatch(updateItem({ id: item.id, updatedData }));
        alert("Данные обновлены");
    };

    const handleDeleteItem = () => {
        dispatch(deleteItem(item.id));
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;
        setNewImage((prevImages) => [...prevImages, ...files]);
    };

    const handleUploadImage = async () => {
        if (newImage.length) {
            for await (const img of newImage) {
                await dispatch(uploadImage({ file: img, itemId: item.id }));
            }

            alert("Фото загружено");
            setNewImage(null);
        }
    };

    const handleDeleteImage = (url) => {
        if (images.length > 1) {
            if (url === coverImage) {
                alert("Нельзя удалить обложку");
                return;
            }
            dispatch(deleteImage({ url, itemId: item.id }));
            setImages((prevImages) => prevImages.filter((i) => i !== url));
            alert("Фото удалено");
        }
    };

    const handleCoverImageChange = (imageUrl) => {
        setCoverImage(imageUrl);
        alert("Обложка установлена");
    };

    useEffect(() => {
        dispatch(updateItem({ id: item.id, updatedData: { coverImg: coverImage } }));
    }, [coverImage]);

    useEffect(() => {
        dispatch(updateItem({ id: item.id, updatedData: { soldOut: isSoldOut } }));
    }, [isSoldOut]);

    // Функция для изменения значения поля key или value
    const handleInputChange = (index, field, value) => {
        setProperties((prevProperties) => {
            const newProperties = [...prevProperties]; // Создаем копию массива
            newProperties[index] = { ...newProperties[index], [field]: value }; // Создаем копию объекта и изменяем поле
            return newProperties; // Обновляем состояние
        });
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
        <div className="product-admin">
            <div className="product-admin__flex">
                <div className="product-item__form">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="product-form__input" />
                    <input
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="product-form__input"
                    />
                    <input value={price} onChange={(e) => setPrice(e.target.value)} className="product-form__input" />

                    <div className="product-item__input">
                        <label htmlFor="">Новая цена</label>
                        <input
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="product-form__input"
                        />
                    </div>

                    <textarea
                        className="product-admin__textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="key-value-editor">
                    {properties?.map((pair, index) => (
                        <div key={`index${item.id}`} className="property-row">
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

            <ul className="product-admin__image-list">
                {item.imgSources?.map((imageUrl, index) => (
                    <li key={index} className="product-form__image-container">
                        <img src={imageUrl} alt={`Uploaded ${index}`} className="product-form__image-preview" />
                        <button
                            type="button"
                            className="product-form__remove-image"
                            onClick={() => handleDeleteImage(imageUrl)}
                        >
                            Удалить
                        </button>
                        <button
                            type="button"
                            className={`product-form__cover-image ${coverImage === imageUrl ? "selected" : ""}`}
                            onClick={() => handleCoverImageChange(imageUrl)}
                        >
                            Сделать обложкой
                        </button>
                    </li>
                ))}
            </ul>

            <input className="product-admin__file-input" type="file" multiple onChange={handleImageChange} />
            <button className="product-admin__button" onClick={handleUploadImage}>
                Загрузить новые фото
            </button>

            <div className="product-admin__buttons">
                <button className="product-admin__button" onClick={handleUpdateItem}>
                    Обновить
                </button>
                <button className="product-admin__button--delete" onClick={handleDeleteItem}>
                    Удалить
                </button>

                <div className="form-checkbox">
                    <input
                        type="checkbox"
                        id={`sold-out-${item.id}`}
                        checked={isSoldOut}
                        onChange={(e) => setIsSoldOut(e.target.checked)}
                    />
                    <label htmlFor={`sold-out-${item.id}`}>sold out</label>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
