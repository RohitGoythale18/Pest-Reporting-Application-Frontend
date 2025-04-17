import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../auth/config";

const Login = ({ setIsAuthenticated, heading }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(
                `${API_BASE_URL}/login`,
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.data && res.data.token && res.data.user) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.user.id);

                setIsAuthenticated(true);
                navigate("/");
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            alert("Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded md:w-[50%] flex flex-col gap-5 mx-auto mt-20">
            <h2 className="text-xl font-bold">{heading}</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border p-2 w-full mb-2"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border p-2 w-full mb-2"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <p className="mt-4 text-md text-gray-600 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;
