import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import HorizontalSlider from "./horizontalslider/HorizontalSlider";
import Spotlight from "./spotlight/Spotlight";
import config from "../config";
import MultiLineCardContainer from "./multilinecardcontainer/MultiLineCardContainer";

export default function Home() {
  const [trending, setTrending] = useState();
  const [recentUploads, setRecentUploads] = useState();
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`${config.API}/simpanime/anime/trending`);
        if (response.ok) {
          const result = await response.json();
          setTrending(result);
        }
      } catch (error) {
        console.log("Error Fetching Trending", error);
      }
    };
    const fetchRecentUploads = async () => {
      try {
        const response = await fetch(
          `${config.API}/simpanime/anime/recent-uploads`
        );
        if (response.ok) {
          const result = await response.json();
          setRecentUploads(result);
        }
      } catch (error) {
        console.log("Error Fetching Recent Uploads", error);
      }
    };
    fetchTrending();
    fetchRecentUploads();
  }, []);
  return (
    <>
      <Spotlight />

      {trending && <HorizontalSlider type={"Trending"} data={trending} />}

      {recentUploads && (
        <MultiLineCardContainer
          type={"Latest Episodes"}
          data={recentUploads}
        />
      )}
    </>
  );
}
