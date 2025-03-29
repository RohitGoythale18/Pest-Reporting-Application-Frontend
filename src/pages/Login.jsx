import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://pest-reporting-application-backend.onrender.com/pest-report/login",
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
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded md:w-[50%] flex flex-col gap-5 mx-auto mt-20">
            <h2 className="text-xl font-bold">Login</h2>
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
                    Login
                </button>
            </form>

            <p className="mt-4 text-md text-gray-600 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default Login;
