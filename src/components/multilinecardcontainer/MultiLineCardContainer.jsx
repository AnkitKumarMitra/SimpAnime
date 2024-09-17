import { useNavigate } from "react-router-dom";
import style from "./MultiLineCardContainer.module.css";
import Card from "../Card/Card";

export default function MultiLineCardContainer({ type, data }) {

  return (
    <div className={style.cardContainer}>
      <h1 className={`${style.sliderType} kanitBold`}>{type}</h1>
      <div className={style.containCard}>
        {data.length > 0 ? (
          data.map((result) => (
            <Card
              key={result.id}
              props={{
                id: result.id,
                title: result.title,
                image: result.image.small,
                synopsis: result.synopsis,
                aired: result.aired,
                status: result.status,
                episodeNumber: result.episodeNumber
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
