import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const reportData = [
    { week: 'Week 1', Termites: 30, Cockroaches: 20, Mosquitoes: 45 },
    { week: 'Week 2', Termites: 50, Cockroaches: 30, Mosquitoes: 55 },
    { week: 'Week 3', Termites: 40, Cockroaches: 25, Mosquitoes: 60 },
    { week: 'Week 4', Termites: 60, Cockroaches: 40, Mosquitoes: 75 },
];

const ReportTrends = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Report Trends by Week</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Termites" stroke="#6366f1" strokeWidth={2} />
                    <Line type="monotone" dataKey="Cockroaches" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="Mosquitoes" stroke="#10b981" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ReportTrends;