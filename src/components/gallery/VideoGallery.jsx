import React, { useEffect, useRef } from "react";
import videoSrc from "../../assets/Gallery.mp4";

const VideoGallery = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.loop = true;
            videoRef.current.playsInline = true;
            videoRef.current.play();
        }
    }, []);

    return (
        <div className="video-gallery__container">
            <video
                ref={videoRef}
                src={videoSrc}
                className="video-gallery"
                muted
                loop
                playsInline
                webkitPlaysinline
            ></video>
        </div>
    );
};

export default VideoGallery;
