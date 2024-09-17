import { useState } from "react";
import { SearchResultsList } from "./SearchResultList";
import style from "./SearchBar.module.css";

import React from "react";
import SearchField from "./SearchField";

export default function SearchBar() {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true);
  return (
    <div className={style.searchBarContainer}>
    <SearchField
      setResults={setResults}
      results={results}
      setShowResults={setShowResults}
    />
    {showResults && results.length > 0 && (
      <SearchResultsList
        results={results}
        setShowResults={setShowResults}
        showResults={showResults}
      />
    )}
  </div>
  );
}