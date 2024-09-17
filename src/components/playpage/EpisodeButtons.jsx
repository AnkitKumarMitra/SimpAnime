import { useState, useEffect } from "react";
import style from "./EpisodeButtons.module.css";

export default function EpisodeButtons({
  episodes,
  selectedEpisode,
  onEpisodeClick,
  totalEpisodes,
  episodesPerPage,
  animeId,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(selectedEpisode || null);
  const [watchedEpisodes, setWatchedEpisodes] = useState(() => {
    const storedWatched = localStorage.getItem("watchedEpisodes");
    return storedWatched ? JSON.parse(storedWatched) : {};
  });

  const markEpisodeAsWatched = (episodeId) => {
    setWatchedEpisodes((prevState) => {
      const updatedWatched = { ...prevState, [episodeId]: true };
      localStorage.setItem("watchedEpisodes", JSON.stringify(updatedWatched));
      return updatedWatched;
    });
  };

  useEffect(() => {
    if (selectedEpisode) {
      setCurrentEpisode(selectedEpisode);
      markEpisodeAsWatched(selectedEpisode);
      localStorage.setItem(animeId, selectedEpisode);
    } else {
      const storedEpisode = localStorage.getItem(animeId);
      if (storedEpisode) {
        setCurrentEpisode(storedEpisode);
        markEpisodeAsWatched(storedEpisode);
      } else if (episodes.length > 0) {
        const firstEpisodeId = episodes[0].id;
        setCurrentEpisode(firstEpisodeId);
        localStorage.setItem(animeId, firstEpisodeId);
        markEpisodeAsWatched(firstEpisodeId);
      }
    }
  }, [episodes, animeId, selectedEpisode]);

  useEffect(() => {
    if (currentEpisode) {
      const episodeIndex = episodes.findIndex(
        (episode) => episode.id === currentEpisode
      );
      if (episodeIndex !== -1) {
        const page = Math.ceil((episodeIndex + 1) / episodesPerPage);
        setCurrentPage(page);
      }
    }
  }, [currentEpisode, episodes, episodesPerPage]);

  const handleEpisodeClick = (episodeId) => {
    setCurrentEpisode(episodeId);
    markEpisodeAsWatched(episodeId);
    localStorage.setItem(animeId, episodeId);
    onEpisodeClick(episodeId);
  };

  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.value));
  };

  const getPaginatedEpisodes = () => {
    const startIndex = (currentPage - 1) * episodesPerPage;
    return episodes.slice(startIndex, startIndex + episodesPerPage);
  };

  const generateOptionGroups = () => {
    const totalPages = Math.ceil(totalEpisodes / episodesPerPage);
    const options = [];
    for (let page = 1; page <= totalPages; page++) {
      options.push(
        <option key={page} value={page}>
          {`Episodes ${(page - 1) * episodesPerPage + 1}-${Math.min(
            page * episodesPerPage,
            totalEpisodes
          )}`}
        </option>
      );
    }
    return options;
  };

  return (
    <div className={style.episodeButtonsContainer}>
      <div className={style.pagination}>
        <label htmlFor="page-select">List of episodes.</label>
        <select
          className={style.pageSelect}
          value={currentPage}
          onChange={handlePageChange}
        >
          {generateOptionGroups()}
        </select>
      </div>
      <div className={style.episodeButtons}>
        {getPaginatedEpisodes().map((episode) => (
          <button
            key={episode.id}
            onClick={() => handleEpisodeClick(episode.id)}
            className={
              watchedEpisodes[episode.id]
                ? style.episodeButtonWatched
                : style.episodeButton
            }
          >
            Episode {episode.number}
          </button>
        ))}
      </div>
    </div>
  );
}
