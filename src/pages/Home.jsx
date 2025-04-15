import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const Home = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found.");
                    return;
                }

                const response = await axios.get(
                    `${API_BASE_URL}/reports`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-5">Your Pest Reports</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : reports.length === 0 ? (
                <p className="text-center">No reports available</p>
            ) : (
                <div className="flex flex-col gap-5 p-6">
                    {reports.map((report) => (
                        <div key={report._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-1">
                            <h2 className="text-lg font-semibold">{report.pestType}</h2>
                            <p className="text-gray-600"><strong>Location:</strong> {report.location}</p>
                            <p className="text-gray-600"><strong>Description:</strong> {report.description}</p>
                            {report.imageUrl && (
                                <img src={report.imageUrl} alt="Pest" className="size-72 object-cover mt-2 rounded-lg" />
                            )}
                            <p className="text-sm text-gray-500 mt-2">Reported on: {new Date(report.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
