import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../pages/history.css";
const History = () => {
  const [task, setTask] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const fetchTask = async () => {
    try {
      const response = await api.get("/task");
      setTask(response.data.tasks);
      setTaskCount(response.data.count);
    } catch (err) {
      console.error("Task history Error : ", err);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTask();
  }, []);
  const deleteTask = async (id) => {
    await api.delete(`/task/${id}`);
    setTask((prev) => prev.filter((task) => task.id !== id));
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="history-container">
      <div className="nav">
        <h1>
          Task History{" "}
        </h1>
        <button className="logout" onClick={goBack}>Dashboard</button>
      </div>
      <h3> Total Task: {taskCount}</h3>
      <div className="left">
        <div className="task-list">
          {task.map((item) => {
            const { id, task_name, category, time_minutes, date } = item;
            return (
              <div className="task-details" key={id}>
                <p className="avatar">{id}</p>
                <br />
                <p>Task_Name: {task_name}</p>
                <p>Category: {category}</p>
                <p>Time_Minutes: {time_minutes}</p>
                <p>Date: {date}</p>
                <br />

                <button className="delete-btn"
                  onClick={() => {
                    deleteTask(id);
                  }}
                >
                  Delete
                </button>
                 <button className="edit-btn" onClick={() => navigate(`/update/${id}`)}>
                      Edit
                    </button>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
