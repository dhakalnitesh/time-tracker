import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/dashboard.css";
import api from "../services/api";
import { deleteTask } from "../services/api";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  const [list, setList] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/task");
      // console.log(response.data);
      setList(response.data);
    };
    fetchData();
  }, []);
  const taskDelete=async(id)=>{
    //  console.log("the list id:",id);
    try{
      // const response =await api.delete(`/task/${id}`);
      // console.log(response.data);
      //Below is the same but
      await deleteTask(`${id}`);
      setList(prev => prev.filter(task => task.id !== id));
    }catch(err){
      console.error(err);
    }
  }
  const getSummary=async()=>{
    try{

      const response=await api.get(`/task/summary/${currentDate}`);
      console.log(response.data);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="dashboard-container">
      <div className="nav">
        <h1>Task Tracker System</h1>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
      <button onClick={addTask}>Add Task</button>
       <div className="time-summary">

      <h2>Today Task Summary</h2>
      <button onClick={()=>getSummary}>Summary</button>
      </div>

      <div className="task">
        <h2>Task List</h2>
        <div className="task-list">
        {list.map(item=> {
          const {id,task_name,category,time_minutes,date}=item;
          return(
            <div className="task-details" key={id} >
              <p className="avatar">{id}</p>
              <p>{task_name}</p>
              <p>{category}</p>
              <p>{time_minutes}</p>
              <p>{date}</p>
              <button onClick={()=>taskDelete(id)}>Delete</button>
           
              <br />
            </div>
          );
        })}
        </div>
      </div>
     
    </div>
  );
 
};

export default Dashboard;
