import { useState } from "react";
import axios from "axios";

const ReportForm = () => {
    const [location, setLocation] = useState("");
    const [pestType, setPestType] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in first.");
            return;
        }

        const formData = new FormData();
        formData.append("location", location);
        formData.append("pestType", pestType);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }

        console.log("Submitting Data:", Object.fromEntries(formData.entries()));

        try {
            const response = await axios.post(
                "https://pest-reporting-application-backend.onrender.com/pest-report/submit",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Report submitted successfully!");

            setLocation("");
            setPestType("");
            setDescription("");
            setImage(null);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to submit report");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold my-5">Report a Pest Problem</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="border p-2 w-full mb-2"
                    required
                />
                <select
                    value={pestType}
                    onChange={(e) => setPestType(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                >
                    <option value="">Select Pest Type</option>
                    <option value="Rats">Rats</option>
                    <option value="Cockroaches">Cockroaches</option>
                    <option value="Termites">Termites</option>
                </select>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border p-2 w-full mb-2"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    className="border p-2 w-full mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-700 rounded"
                >
                    
                    {isLoading ? "Submitting..." : "Submit Report"}
                </button>
            </form>
        </div>
    );
};

export default ReportForm;
