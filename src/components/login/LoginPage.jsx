import React, { useState } from "react";
import style from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../utils/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const response = await login(userData);

      navigate("/");
    } catch (error) {
      setError(error.message || "Invalid username or password.");
    }
  };

  return (
    <div className={style.container}>
      <h1 className="brand">
        An
        <span>
          <b>!</b>
        </span>
        me
      </h1>

      <form onSubmit={handleSubmit} className={style.form}>
        <label htmlFor="email" className={style.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style.input}
          required
        />
        <label htmlFor="password" className={style.label}>
          Password:
        </label>
        <div className={style.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${style.input} ${style.passwordInput}`}
            required
          />
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {error && <p className={style.error}>{error}</p>}
        <button type="submit" className={style.button}>
          Log In
        </button>
      </form>
    </div>
  );
}
