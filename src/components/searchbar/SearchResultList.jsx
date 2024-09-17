import { SearchResult } from "./SearchResult";
import style from "./SearchResultList.module.css";

export const SearchResultsList = ({ results, setShowResults }) => {
  return (
    <div className={style.resultsList}>
      {results.map((result) => {
        return (
          <SearchResult
            onClick={() => handleResultClick(result)}
            props={{
              mal_id: result.id,
              title: result.title,
              image: result.image.webp.large_image_url,
              type: result.type,
              status: result.status,
              score: result.score,
              season: result.season,
              year: result.year,
              sysnopsis: result.synopsis,
            }}
            setShowResults={setShowResults}
            key={result.id}
          />
        );
      })}
    </div>
  );
};
