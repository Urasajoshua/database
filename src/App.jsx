import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Home from "./screens/Home";
import Students from "./screens/Students";
import Supervisors from "./screens/Supervisors";
import Dissertation from "./screens/Dissertation";
import Settings from "./screens/Settings";
import Login from "./screens/Login";

function AppLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && (
        <div className="flex">
          <Sidebar />
          <Dashboard />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Students />} />
        <Route path="/supervisors" element={<Supervisors />} />
        <Route path="/dissertations" element={<Dissertation />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
