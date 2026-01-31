import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../pages/signup.css"

function Signup  () {
  const navigate=useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    setError("");
    try{
      await signup({email,password});
// const response=await api.post("/signup",{
//   email,password
// });
// console.log(response);
alert("Successfully created")
navigate("/");
    }catch(err){
      setError("Failed to register the data");
      setTimeout(()=>{setError,3000});
      console.log(err)}
    finally{setloading(false)};
  };
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Task Tracker System</h1>
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-box">
            <label htmlFor="username">username</label>
            <input
              type="userName"
              id="username"
              value={user}
              placeholder="Enter Your Name"
              required
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </div>

          <div className="form-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-box">
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {error &&{error}}
          <button type="submit" disabled={loading}>
            {loading?"signing in":"sign"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
