import React, { useEffect, useState, useRef } from "react";
import { FaClock } from "react-icons/fa";
import style from "./Spotlight.module.css";
import config from "../../config";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Spotlight() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${config.API}/simpanime/anime/spotlight`);
      const result = await response.json();
      setData(result);
      preloadImages(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const preloadImages = (items) => {
    items.forEach((item) => {
      const img = new Image();
      img.src = item.bannerImage.original;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [item.id]: true }));
      };
      img.onerror = () => {
        console.error("Image failed to load:", item.bannerImage.original);
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data]);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    startAutoSlide();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    startAutoSlide();
  };

  const handleWatchNow = () => {
    navigate(`/play/${data[currentIndex].title}`);
  };

  return (
    <div className={style.sliderContainer}>
      {data.length > 0 && data[currentIndex] ? (
        <div className={style.spotlightContainer}>
          {!loadedImages[data[currentIndex].id] ? (
            <div className={style.loader}>Loading...</div>
          ) : (
            <img
              src={data[currentIndex].bannerImage.original}
              alt={data[currentIndex].title}
              className={style.bannerImage}
            />
          )}
          <div className={style.overlay} />
          <div className={style.textContainer}>
            <h2 className={style.title}>{data[currentIndex].title}</h2>
            <div className={style.details}>
              <FaCirclePlay /> &nbsp; {data[currentIndex].type} &nbsp;&nbsp;{" "}
              <FaClock /> &nbsp; {data[currentIndex].startDate}
            </div>
            <p className={style.synopsis}>{data[currentIndex].synopsis}</p>
            <button
              className={`${style.watchButton} kanitBold`}
              onClick={handleWatchNow}
            >
              <FaCirclePlay /> &nbsp; Watch Now
            </button>
          </div>
          <div className={style.arrowContainer}>
            <IoIosArrowForward className={style.arrow} onClick={handleNext} />
            <IoIosArrowBack className={style.arrow} onClick={handlePrev} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
}
