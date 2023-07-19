import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // New state for error handling

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error before making the API call

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}auth/login`,
        {
          username,
          password,
        }
      );

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password"); // Set the error message
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}{" "}
        {/* Display error message */}
        <div className="form-group">
          <label htmlFor="login-username">Username:</label>
          <input
            type="text"
            id="login-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: "10px",
            marginLeft: "60px",
            height: "30px",
            backgroundColor: "green",
            color: "white",
            fontSize: "18px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // New state for error handling

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error before making the API call

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}auth/register`, {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      setError("Registration failed. Please try again."); // Set the error message
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="error">{error}</div>}{" "}
        {/* Display error message */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: "10px",
            marginLeft:"60px",
            height: "30px",
            backgroundColor: "green",
            color: "white",
            fontSize: "18px",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};
