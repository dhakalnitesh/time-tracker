import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
        <h2>
          Task History{" "}
          <span>
            <button onClick={goBack}>Back to Dashboard</button>
          </span>
        </h2>
      </div>
      <h3> Total Task: {taskCount}</h3>
<div className="left">
      <div className="task-list">
        {task.map((item) => {
          const { id, task_name, category, time_minutes, date } = item;
          return (
            <div className="task-details" key={id}>
              <p className="avatar">{id}</p>
              <p>{task_name}</p>
              <p>{category}</p>
              <p>{time_minutes}</p>
              <p>{date}</p>
              <br />
              <button
                onClick={() => {
                  deleteTask(id);
                }}
              >
                Delete
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
