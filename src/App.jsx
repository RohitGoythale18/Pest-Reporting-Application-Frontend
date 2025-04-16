import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ReportForm from "./components/ReportForm";
import Profile from "./components/Profile";

import AdminRegister from "./admin/AdminRegister";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ReportsTable from "./admin/ReportsTable";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(
          `${API_BASE_URL}/verify`,
          {
            headers: { Authorization: `Bearer ${token}` },
          })
        .then((response) => {
          if (response.data.valid) {
            setIsAuthenticated(true);
            setIsAdmin(response.data.role === "admin");
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setIsAdmin(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated && !isAdmin && <Navbar />}

      <Routes>
        <Route path="*" element={<Navigate to="/" />} />

        {/* User Routes */}
        <Route path="/register" element={<Register heading="Register" />} />
        <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} heading="Login" /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/report" element={isAuthenticated ? <ReportForm /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" />} /> {/* 👈 Force redirect to admin login first */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="register" element={<AdminRegister heading="Admin Register" />} />
          <Route path="login" element={!isAuthenticated ? <AdminLogin setIsAuthenticated={setIsAuthenticated} heading="Admin Login" /> : <Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="new-reports" element={<ReportsTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
