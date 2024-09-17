import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import style from "./SearchField.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import config from "../../config";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchField({ setResults, results, setShowResults, showResults }) {
  const [input, setInput] = useState("");
  const [triggerNavigate, setTriggerNavigate] = useState(false);
  
  const debouncedInput = useDebounce(input, 500);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (debouncedInput.trim() === "") {
      setResults([]);
      setShowResults(true);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.API}/simpanime/anime/search?q=${debouncedInput}`
        );
        const result = await response.json();
        if (debouncedInput.trim() !== "") {
          setResults(result);
          if (triggerNavigate) {
            navigate(`/search/${debouncedInput.trim()}`, { state: { name: debouncedInput, results: result } });
            setTriggerNavigate(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [debouncedInput, setResults, triggerNavigate, navigate]);

  const handleChange = (e) => {
    setShowResults(true);
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setShowResults(false);
      setTriggerNavigate(true);
    }
  };

  const handleResultList = () => {
    if (debouncedInput.length > 0) setShowResults(!showResults);
  };

  useEffect(() => {
    setShowResults(false);
  }, [location]);

  return (
    <div className={style.inputWrapper}>
      <input
        className={style.inputField}
        placeholder="Type to search..."
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={handleResultList}
      />
      <FaSearch className={style.searchIcon} />
    </div>
  );
}
