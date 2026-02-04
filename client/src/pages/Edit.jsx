import React from "react";
import "../pages/edit.css";
import { useNavigate } from "react-router-dom";

const Edit = () => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate("/dashboard");
    };
    return (
        <div className="box-container">
            <div className="form-box edit">
                <h2>Update Data</h2>
                <button className="back-btn" onClick={goBack}>
                    Dashboard
                </button>
                <label htmlFor="task">Task_Name</label>
                <input type="text" id="task" required />
                <label htmlFor="category">Category</label>
                <input type="text" id="category" required />
                <label htmlFor="minutes">Time_Minutes</label>
                <input type="number" id="minutes" required />
                <label htmlFor="date"></label>
                <input type="date" name="" id="date" />
                <button>Update</button>
            </div>
        </div>
    );
};

export default Edit;
