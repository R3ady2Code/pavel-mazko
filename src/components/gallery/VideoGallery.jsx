import React, { useEffect, useRef, useState } from "react";
import videoSrc from "../../assets/Gallery.mp4";

const VideoGallery = () => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
            videoRef.current.loop = true;
            videoRef.current.playsInline = true;
            videoRef.current.play();
        }
    }, [isMuted]);

    const handleVideoClick = () => {
        setIsMuted((prevMuted) => !prevMuted);
    };

    return (
        <div className={`video-gallery__container ${isMuted ? "" : "video-gallery__container--sound-on"}`}>
            <video
                ref={videoRef}
                src={videoSrc}
                className="video-gallery"
                muted={isMuted}
                loop
                playsInline
                webkitPlaysinline
                onClick={handleVideoClick}
            ></video>
        </div>
    );
};

export default VideoGallery;
