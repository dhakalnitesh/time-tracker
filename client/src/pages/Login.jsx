import React from "react";
import "../pages/login.css";
import { useState } from "react";
import { login } from "../services/api";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({email,password});
      // const response = await api.post("/login", {
      //   email,
      //   password,
      // });
      // console.log(response.data)
      // localStorage.setItem("token", response.data.token);
       navigate('/dashboard');
     

      console.log("Success to get the credintals");
    } catch (err) {
      // console.error(
      //   "Login failed:",
      //   err.response?.data?.message || err.message,
      // );
      setError(err.response?.data?.message || "Login failed");
      setTimeout(()=>setError(""),3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Time Tracker System</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         {error&& <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading} className="login-btn">
          {loading ? "logging in..." : "Login"}
        </button>
        </form>

        <p className="signup-link">
          Didn't have a account?
          
          <Link to="/signup">signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

