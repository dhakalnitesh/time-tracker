/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/dashboard.css";
import api from "../services/api";
import { deleteTask } from "../services/api";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  useEffect(() => {
    fetchData(currentDate);
    fetchSummary(currentDate);
  }, []);

  const [list, setList] = useState([]);
  const [taskCount, setTaskCount] = useState(0);

  const [summary, setSummary] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    const confirm = window.confirm("Do you really want to logout?");
    if (confirm) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const addTask = async () => {
    navigate("/addTask");
  };

  const fetchData = async (date) => {
    try {
      const selectedDate = date || currentDate;
      const response = await api.get(`/task/date=${selectedDate}`);

      if (!response.data || response.data.length === 0) {
        setList([]);
      } else {
        setTaskCount(response.data.count);
        setList(response.data.tasks);
        setError(null);
      }
    } catch (err) {
      console.error("Task Fetch Error:", err);
      setError("Something went wrong");
    }
  };
  const taskHistory = () => {
    navigate("/History");
  };
  const fetchSummary = async (date) => {
    const selectedDate = date || currentDate;
    try {
      const summaryResponse = await api.get(
        `/task/summary/date=${selectedDate}`,
      );
      if (!summaryResponse.data || summaryResponse.data.length === 0) {
        setSummary([]);
      } else {
        setSummary(summaryResponse.data);
      }
    } catch (err) {
      console.error("SummaryDate Fetch Error:", err);
    }
  };

  const taskDelete = async (id) => {
    try {
      await deleteTask(`${id}`);
      setList((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="dashboard-container">
    {/* NAV */}
    <div className="nav">
      <h1>Task Tracker System</h1>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>

    {/* LEFT + RIGHT WRAPPER */}
    <div className="main">
      {/* LEFT */}
      <div className="left">
        <div className="task-buttons">
        <button className="btn-primary" onClick={addTask}>Add Task</button>
        <button className="btn-primary" onClick={taskHistory}>Task History</button>
</div>

        <div className="task-head">
          <div className="task">
            <h3>
              Task List{" "}
              <input
                type="date"
                name="date"
                onChange={(e) => {
                  fetchData(e.target.value);
                  fetchSummary(e.target.value);
                }}
              />
            </h3>
            <h4>Total Task: {taskCount}</h4>
          </div>

          {error && <p className="error">{error}</p>}
          {!error && list.length === 0 && <p>No tasks found for today</p>}

          <div className="task-list">
            {list.map((item) => {
              const { id, task_name, category, time_minutes, date } = item;
              return (
                <div className="task-details" key={id}>
                  <p className="avatar">{id}</p>
                  <p>Task_Name: {task_name}</p>
                  <p>Category: {category}</p>
                  <p>Time_minutes: {time_minutes}</p>
                  <p>Date: {date}</p>
                  <button className="delete-btn" onClick={() => taskDelete(id)}>Delete</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="time-summary">
          <h3>Today Task Summary</h3>

          {!error && (!summary || summary.length === 0) && (
            <p>No summary for today</p>
          )}

          {summary &&
            summary.length > 0 &&
            summary.map((time, index) => {
              const minutesTotal = Number(time.total_minutes);
              const hours = Math.floor(minutesTotal / 60);
              const minute = minutesTotal % 60;

              return (
                <div key={index}>
                  <p>{time.date}</p>
                  <p>
                    Total Time: {hours > 0 && `${hours} hour `}
                    {minute} minutes
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  </div>
);

};

export default Dashboard;
