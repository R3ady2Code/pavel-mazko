import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import imgSrc from "../../assets/link1.jpg"; // Импорт изображения
import videoSrc from "../../assets/link2.mp4"; // Импорт изображения

const LinkBlock = ({ type, title, path }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && type === "video") {
            videoRef.current.muted = true;
            videoRef.current.loop = true;
            videoRef.current.playsInline = true; // Явно указываем свойство
            videoRef.current.play();
        }
    }, []);

    return (
        <Link to={path} className="link-block">
            {type === "photo" && (
                <>
                    <div className="link-block__photo">
                        <img src={imgSrc} alt={title} className="link-block__image" />
                    </div>
                    <p className="link-block__title">{title}</p>
                </>
            )}
            {type === "video" && (
                <>
                    <div className="link-block__video">
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            className="link-block__video-player"
                            muted
                            loop
                            playsInline
                            webkitPlaysinline
                        >
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    </div>
                    <p className="link-block__title">{title}</p>
                </>
            )}
        </Link>
    );
};

export default LinkBlock;
