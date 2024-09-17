import React from "react";
import style from "./Card.module.css";
import { useNavigate } from "react-router-dom";

export default function Card({ props }) {
  const navigate = useNavigate();
  const { title, image, synopsis, aired, status, episodeNumber } = props;

  const handleWatchNow = () => {
    navigate(`/play/${title}`, { state: { episodeNumber } });
  };

  return (
    <div className={style.card}>
      <img src={image} alt={`${title} image`} className={style.image} />
      <div className={style.overlay}>
        <div className={style.title}>{title}</div>
        <div className={style.yearStatus}>
          Aired: {aired} <br />
          Status: {status}
        </div>
        <div className={style.synopsis}>{synopsis}</div>
        <div className={style.action}>
          <button className={`${style.workButton} kanitBold`}>
            Read More...
          </button>
          <button
            className={`${style.workButton} kanitBold`}
            onClick={handleWatchNow}
          >
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}
