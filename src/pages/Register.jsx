import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(email)) {
            alert("Invalid email format");
            return;
        }
        if (!phoneRegex.test(phone)) {
            alert("Phone number must be 10 digits");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(
                `${API_BASE_URL}/register`,
                { username, email, phone, password }
            );
            navigate("/login");
        } catch (error) {
            alert("Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded md:w-[50%] flex flex-col gap-5 mx-auto mt-20">
            <h2 className="text-xl font-bold">Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="border p-2 w-full mb-2"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border p-2 w-full mb-2"
                    required
                />
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
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
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 w-full"
                >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            <p className="mt-4 text-md text-gray-600 text-center">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign In</Link></p>
        </div>
    );
};
export default Register;