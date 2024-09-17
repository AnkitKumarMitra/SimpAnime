import { Link } from "react-router-dom";
import style from "./SearchResult.module.css";

export const SearchResult = ({ props, setShowResults }) => {
  const { mal_id, title, image, type, status, score, season, year } = props;
  const handleResultClick = () => {
    setShowResults(false);
  };

  return (
    <Link
      className={style.searchResult}
      to={`/play/${title}`}
      state={props}
      onClick={handleResultClick}
    >
      <img src={image} alt={`${title} image`} />
      <div className={style.listDetails}>
        <p className={`${style.resultTitle}`}>{title}</p>
        <div className={`${style.resultStatus} kanitLight`}>
          <strong>{type}</strong> Score: {score} {status}
        </div>
        <div className={`${style.resultSeason} kanitLight`}>
          {season} {year}
        </div>
      </div>
    </Link>
  );
};
