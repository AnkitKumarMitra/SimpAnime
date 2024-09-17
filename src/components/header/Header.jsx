import { useEffect, useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/authService";
import { useUser } from "../../contexts/userContext.jsx";
import { FaChevronDown } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  const [results, setResults] = useState([]);
  const [user, setUser] = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleLogout = async () => {
    try {
      logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const redirectHome = () => {
    navigate("/");
  };

  return (
    <header className={style.header}>
      <div className={style.headerWrapper}>
        <h1 className="brand" onClick={redirectHome}>
          S
          <span>
            <b>!</b>
          </span>
          mp
          An
          <span>
            <b>!</b>
          </span>
          me
        </h1>
        <SearchBar setResults={setResults} />
      </div>
      <div className={style.buttonContainer}>
        {user ? (
          <div className={style.dropdown}>
            <button
              onClick={toggleDropdown}
              className={`${style.loginButton} kanitBold`}
            >
              Welcome, {user.username} &nbsp;&nbsp;
              <FaChevronDown />
            </button>
            {dropdownVisible ? (
              <ul className={style.menu}>
                <li className={style.menuItem}>
                  <button>
                    <CgProfile /> &nbsp;&nbsp; My Profile
                  </button>
                </li>
                <li className={style.menuItem}>
                  <button onClick={handleLogout}>
                    <IoIosLogOut /> &nbsp;&nbsp; Logout
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        ) : (
          <button
            onClick={handleLoginClick}
            className={`${style.loginButton} kanitBold`}
          >
            Log In
          </button>
        )}
      </div>
    </header>
  );
}