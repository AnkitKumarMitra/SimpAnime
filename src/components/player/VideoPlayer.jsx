import React, { useRef, useEffect, useState } from "react";
import style from "./VideoPlayer.module.css";
import Hls from "hls.js";
import config from "../../config";

const VideoPlayer = ({animeId, sources, title, totalEpisode, episodeId }) => {
  const videoRef = useRef(null);
  const [quality, setQuality] = useState("default");
  const [isPlaying, setIsPlaying] = useState(false);
  const [data, setData] = useState(null);
  const [savedTime, setSavedTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.API}/simpanime/anime/get-banner-poster/${title}`
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [title]);

  useEffect(() => {
    const savedTime = localStorage.getItem(`episode_${episodeId}_time`);
    if (savedTime) {
      setSavedTime(Number(savedTime));
    } else {
      setSavedTime(0);
    }
  }, [episodeId]);

  useEffect(() => {
    if (!Hls.isSupported()) {
      console.error("HLS.js is not supported in this browser.");
      return;
    }

    const hls = new Hls();
    const videoElement = videoRef.current;
    const source =
      sources.find((s) => s.quality === quality) ||
      sources.find((s) => s.quality === "default");

    if (videoElement && source) {
      hls.loadSource(source.url);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (savedTime) {
          videoElement.currentTime = savedTime;
        }
        if (isPlaying) {
          videoElement.play();
        }
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [quality, sources, isPlaying, savedTime]);

  const handleTimeUpdate = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      localStorage.setItem(`episode_${episodeId}_time`, videoElement.currentTime);
    }
  };

  return (
    <div className={style.videoPlayerContainer}>
      <video
        ref={videoRef}
        controls
        className={style.videoElement}
        onTimeUpdate={handleTimeUpdate}
      ></video>
      <div className={style.controlsContainer}>
        <div className={style.animeInfo}>
          {data && data.posterImage && (
            <>
              <img
                src={data.posterImage.tiny}
                className={style.posterImg}
                alt={`${title} poster`}
              />
              <div className={style.animeText}>
                <h2 className={style.title}>{data.title}</h2>
                <p>{data.type} - {totalEpisode} Episodes - {data.status}</p>
                <p>{data.startDate}</p>
              </div>
            </>
          )}
        </div>
        <div className={style.qualityButtons}>
          {["360p", "480p", "720p", "1080p", "default"].map((q) => (
            <button
              key={q}
              className={`${style.qualityButton} ${quality === q ? style.activeQuality : ""}`}
              onClick={() => setQuality(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
