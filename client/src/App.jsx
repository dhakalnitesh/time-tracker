import React from "react";
import Add from "./pages/Add-task";
import Task from "./pages/Task";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Edit from "./pages/Edit";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children; // <-- this renders Dashboard automatically
};

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/task"
            element={
              <ProtectedRoute>
                <Task />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addTask"
            element={
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
