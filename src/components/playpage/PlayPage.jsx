import { useLocation, useParams } from "react-router-dom";
import VideoPlayer from "../player/VideoPlayer";
import config from "../../config";
import { useEffect, useState } from "react";
import EpisodeButtons from "./EpisodeButtons";
import style from "./PlayPage.module.css";

export default function PlayPage() {
  const location = useLocation();
  const { title } = useParams();
  const { episodeNumber } = location.state || {};
  const [id, setId] = useState(null);
  const [episodeList, setEpisodeList] = useState([]);
  const [data, setData] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(episodeNumber);
  const [episodeSources, setEpisodeSources] = useState({
    sources: [],
    downloadUrl: "",
  });

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await fetch(
          `${config.API}/simpanime/anime/gogo-search?q=${title}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const details = await response.json();
        setId(details.id);
      } catch (error) {
        console.error("Error fetching Id", error);
      }
    };
    fetchId();
  }, [title]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.API}/simpanime/anime/episodes/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const details = await response.json();
        setData(details);
        setEpisodeList(details.episodes);
        if (episodeNumber) {
          setSelectedEpisode(episodeNumber);
        } else {
          const storedEpisode = localStorage.getItem(id);
          if (storedEpisode) {
            setSelectedEpisode(storedEpisode);
          } else if (details.episodes.length > 0) {
            setSelectedEpisode(details.episodes[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, episodeNumber]);

  useEffect(() => {
    if (!selectedEpisode) return;

    const fetchEpisodeSources = async () => {
      try {
        const response = await fetch(
          `${config.API}/simpanime/anime/get-episode-source/${selectedEpisode}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        const { sources = [], download = "" } = result;

        if (Array.isArray(sources)) {
          const formattedSources = sources.map((src) => ({
            url: src.url,
            isM3U8: src.isM3U8,
            quality: src.quality,
          }));
          setEpisodeSources({
            sources: formattedSources,
            downloadUrl: download,
          });
        } else {
          console.error("Sources data is not an array:", sources);
          setEpisodeSources({
            sources: [],
            downloadUrl: "",
          });
        }
      } catch (error) {
        console.error("Error fetching episode sources:", error);
        setEpisodeSources({
          sources: [],
          downloadUrl: "",
        });
      }
    };

    fetchEpisodeSources();
  }, [selectedEpisode]);

  return (
    <div className={style.bodyContainer}>
      <h1 className={style.episodeNumber}>{selectedEpisode}</h1>
      <div className={style.streamContainer}>
        <EpisodeButtons
          episodes={episodeList}
          selectedEpisode={selectedEpisode}
          onEpisodeClick={setSelectedEpisode}
          totalEpisodes={data?.totalEpisodes}
          episodesPerPage={50}
          animeId={id}
        />
        {episodeSources.sources.length > 0 ? (
          <VideoPlayer
            animeId={id}
            sources={episodeSources.sources}
            title={data.title}
            totalEpisode={data?.totalEpisodes}
            episodeId={selectedEpisode}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
