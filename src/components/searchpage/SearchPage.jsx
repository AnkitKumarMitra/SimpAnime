import React from "react";
import style from "./SearchPage.module.css";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";

export default function SearchPage() {
  const location = useLocation();
  const state = location.state || {};
  const { name = "", results = [] } = state;

  console.log(results);

  return (
    <>
      <div className={style.resultName}>
        Search Results for: <i className="kanitMediumItalic">{name}</i>
      </div>
      <div className={style.results}>
        {results.length > 0 ? (
          results.map((result) => (
            <Card
              key={result.id}
              props={{
                id: result.id,
                title: result.title,
                image: result.image.webp.large_image_url,
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
    </>
  );
}
