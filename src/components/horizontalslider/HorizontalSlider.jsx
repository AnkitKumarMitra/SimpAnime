import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import style from "./HorizontalSlider.module.css";
import Card from "../Card/Card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function HorizontalSlider({ type, data }) {
  const scrollContainerRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className={style.sliderContainer}>
      <h1 className={`${style.sliderType} kanitBold`}>{type}</h1>

      <IoIosArrowBack
        className={`${style.scrollButton} ${style.leftButton}`}
        onClick={scrollLeft}
      />

      <IoIosArrowForward
        className={`${style.scrollButton} ${style.rightButton}`}
        onClick={scrollRight}
      />

      <div className={style.sliderCardContainer} ref={scrollContainerRef}>
        {data.length > 0 ? (
          data.map((result) => (
            <Card
              key={result.id}
              props={{
                id: result.id,
                title: result.title,
                image: result.image.webp.image_url,
                synopsis: result.synopsis,
                aired: result.aired,
                status: result.status,
              }}
            />
          ))
        ) : (
          <div>No results found.</div>
        )}
      </div>
    </div>
  );
}
