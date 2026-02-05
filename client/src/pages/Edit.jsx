import React, { useEffect, useState } from "react";
import "../pages/edit.css";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        task_name: "",
        category: "",
        time_minutes: "",
        date: "2026-01-05"
    });

    const navigate = useNavigate();

    const { id } = useParams();
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`/task/${id}`);
            // console.log(response.data.date,"I am from fetchData");
            if (response.data) {
                setFormData({
                    task_name: response.data.task_name || "",
                    category: response.data.category || "",
                    time_minutes: response.data.time_minutes || "",
                    date: response.data.date || "",
                })
            }
        } catch (err) {
            setError("failed to load task data")
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = async (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    if (loading) {
        return <div className="loading">Loading task data...</div>;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.task_name || !formData.category || !formData.time_minutes || !formData.date) {
            setError("All fields are required");
            return;
        }
        try {
            await api.put(`/task/update/${id}`, formData);
            alert("Successfully Updated");
            navigate("/dashboard")
        } catch (err) {
            console.log("I am from handleSubmit", err);
        }
    }
    const handleCancel = () => {
        navigate("/dashboard");
    };
    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="box-container">
                <div className="form-box edit">
                    <h2>Update Data</h2>
                    <label htmlFor="task">Task_Name</label>
                    <input type="text" id="task" placeholder="Enter task" name="task_name" required value={formData.task_name} onChange={handleChange} />
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" required value={formData.category} onChange={handleChange} />
                    <label htmlFor="minutes">Time_Minutes</label>
                    <input type="number" id="minutes" name="time_minutes" min={1} required value={formData.time_minutes} onChange={handleChange} />
                    <label htmlFor="date"></label>
                    <input type="date" name="" id="date" value={formData.date} onChange={handleChange} />
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">
                            Update Task
                        </button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Edit;
