import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

const History = () => {
  const [task, setTask] = useState([]);
  const fetchTask = async () => {
    try{
        const response = await api.get("/task");
        console.log("I am the error")
        setTask(response.data);
    }catch(err){
        console.error("Task history Error : ",err);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTask();
  }, []);
  const deleteTask=async(id)=>{
    await api.delete(`/task/${id}`);
    setTask((prev)=>prev.filter((task)=>task.id!==id));
  }
  
  return (
    <div>
      <h2>Task History</h2>
      <div className="task-list">
        { task.map((item) => {
            const { id, task_name, category, time_minutes, date } = item;
            return (
              <div className="task-details" key={id}>
                <p className="avatar">{id}</p>
                <p>{task_name}</p>
                <p>{category}</p>
                <p>{time_minutes}</p>
                <p>{date}</p>
                <br />
         <button onClick={()=>{deleteTask(id)}}>Delete</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default History;
