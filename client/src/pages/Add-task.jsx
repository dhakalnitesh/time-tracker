import React from "react";
import { taskAdd } from "../services/api";
import "../pages/Add-task.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskAdd({ task_name: task, category, time_minutes: time, date });
      alert("Successfully added task..");
      console.log("successfully added");
      e.target.reset();
    } catch (err) {
      console.log("Failed to get the details", err);
    }
  };
  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-box">
            <h1>Add Task</h1>
          
            <label htmlFor="task">Task Name</label>
            <input
              type="text"
              placeholder="Coding"
              id="task"
              required
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="study"
              required
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <label htmlFor="minutes">Time</label>
            <input
              type="number"
              placeholder="60"
              required
              id="minutes"
              onChange={(e) => {
                setTime(Number(e.target.value));
              }}
            />
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name=""
              id="date"
              required
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <br />
             <button type="submit">Save</button>
             <button type="button" onClick={()=>navigate("/dashboard")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
