import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/authService";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userData = { fullName, username, email, password };
      const response = await register(userData);

      if (response.status === 201) {
        navigate("/");
      }
      navigate("/");
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Register</h1>

      <form onSubmit={handleSubmit} className={style.form}>
        <label htmlFor="fullName" className={style.label}>
          Full Name:
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={style.input}
          required
        />

        <label htmlFor="username" className={style.label}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={style.input}
          required
        />

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

        <label htmlFor="confirmPassword" className={style.label}>
          Confirm Password:
        </label>
        <div className={style.passwordContainer}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`${style.input} ${style.passwordInput}`}
            required
          />
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <p className={style.error}>{error}</p>}
        <button type="submit" className={style.button}>
          Register
        </button>
      </form>
    </div>
  );
}
