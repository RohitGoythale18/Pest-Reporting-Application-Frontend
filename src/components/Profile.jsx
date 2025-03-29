import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ setIsAuthenticated }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const token = localStorage.getItem("token");
                
                const response = await axios.get(`https://pest-reporting-application-backend.onrender.com/pest-report/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching profile data:", error.response?.data || error.message);
            }
        };

        fetchUserProfile();
    }, []);


    if (!user) {
        return <p>Loading...</p>;
    }

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");

        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <div className="p-6 bg-white shadow-md rounded flex flex-col gap-5">
            <div>
                <h2 className="text-2xl font-bold">Profile</h2>
                <p className='text-lg'>Username: {user["Username"]}</p>
                <p className='text-lg'>Email: {user["Email"]}</p>
            </div>

            <div>
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white py-2 px-5 rounded-md"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
