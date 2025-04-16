import React from 'react';

const reports = [
    {
        date: '2025-04-15',
        location: 'Thane, MH',
        pest: 'Termites',
        reporter: 'Ravi Patel',
        technician: 'Anil Kumar',
        status: 'Active',
    },
    {
        date: '2025-04-14',
        location: 'Navi Mumbai, MH',
        pest: 'Cockroaches',
        reporter: 'Sneha Desai',
        technician: 'N/A',
        status: 'New',
    },
    {
        date: '2025-04-13',
        location: 'Pune, MH',
        pest: 'Mosquitoes',
        reporter: 'Ajay Shah',
        technician: 'Priya Singh',
        status: 'Resolved',
    },
    {
        date: '2025-04-13',
        location: 'Pune, MH',
        pest: 'Mosquitoes',
        reporter: 'Ajay Shah',
        technician: 'Priya Singh',
        status: 'Resolved',
    },
];

const ReportsTable = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Reports</h2>
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase border-b">
                    <tr>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Location</th>
                        <th className="py-2 px-4">Pest Type</th>
                        <th className="py-2 px-4">Reported By</th>
                        <th className="py-2 px-4">Technician</th>
                        <th className="py-2 px-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{report.date}</td>
                            <td className="py-2 px-4">{report.location}</td>
                            <td className="py-2 px-4">{report.pest}</td>
                            <td className="py-2 px-4">{report.reporter}</td>
                            <td className="py-2 px-4">{report.technician}</td>
                            <td className="py-2 px-4">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${report.status === 'Resolved'
                                        ? 'bg-green-100 text-green-700'
                                        : report.status === 'Active'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {report.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReportsTable;