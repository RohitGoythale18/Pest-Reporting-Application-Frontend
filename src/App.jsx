import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ReportForm from "./components/ReportForm";
import Profile from "./components/Profile";

import Header from "./admin/Header";
import AdminRegister from "./admin/AdminRegister";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ReportsTable from "./admin/ReportsTable";
import { API_BASE_URL } from "./auth/config";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");

    if (adminToken) {
      axios
        .get(`${API_BASE_URL}/admin/verify-admin`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        })
        .then(() => {
          setIsAuthenticated(true);
          setIsAdmin(true);
        })
        .catch(() => {
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
          setIsAdmin(false);
        });
    } else if (userToken) {
      axios
        .get(`${API_BASE_URL}/verify-user`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          if (res.data.valid) {
            setIsAuthenticated(true);
            setIsAdmin(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("userToken");
          setIsAuthenticated(false);
          setIsAdmin(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <>
      {isAuthenticated && !isAdminRoute && <Navbar />}
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />

        {/* User Routes */}
        <Route path="/register" element={<Register heading="Register" />} />
        <Route
          path="/login-user"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} heading="Login" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={isAuthenticated && !isAdmin ? <Home /> : <Navigate to="/login-user" />}
        />
        <Route
          path="/report"
          element={isAuthenticated && !isAdmin ? <ReportForm /> : <Navigate to="/login-user" />}
        />
        <Route
          path="/profile"
          element={
            isAuthenticated && !isAdmin ? (
              <Profile setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login-user" />
            )
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login-admin" />} />
        <Route path="/admin/login-admin" element={
          !isAuthenticated ? (
            <AdminLogin setIsAuthenticated={setIsAuthenticated} heading="Admin Login" />
          ) : (
            <Navigate to="/admin/dashboard" />
          )
        } />
        <Route path="/admin/register" element={<AdminRegister heading="Admin Register" />} />

        {/* Admin Protected Routes with Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              isAuthenticated && isAdmin ? (
                <Dashboard />
              ) : (
                <Navigate to="/admin/login-admin" />
              )
            }
          />
          <Route
            path="new-reports"
            element={
              isAuthenticated && isAdmin ? (
                <ReportsTable />
              ) : (
                <Navigate to="/admin/login-admin" />
              )
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
