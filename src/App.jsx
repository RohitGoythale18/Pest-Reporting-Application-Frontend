import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./auth/config";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import UserProtectedRoute from "./auth/UserProtectedRoute";

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
        .get(`${API_BASE_URL}/verify`, {
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

        <Route path="/register" element={<Register heading="Register" />} />
        <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} heading="Login" /> : <Navigate to="/" />} />

        <Route
          path="/"
          element={
            <UserProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <UserProtectedRoute isAuthenticated={isAuthenticated}>
              <ReportForm />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile setIsAuthenticated={setIsAuthenticated} />
            </UserProtectedRoute>
          }
        />

        <Route path="/admin" element={<Navigate to="/admin/login" />} />
        <Route
          path="/admin/login"
          element={
            !isAuthenticated ? (
              <AdminLogin setIsAuthenticated={setIsAuthenticated} heading="Admin Login" />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />
        <Route path="/admin/register" element={<AdminRegister heading="Admin Register" />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="new-reports" element={<ReportsTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
