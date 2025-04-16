import React from 'react';

const OverviewCards = ({ title, value, icon, color = 'bg-blue-500' }) => {
    return (
        <div className="flex items-center justify-between bg-white rounded-2xl shadow p-4 w-full">
            <div>
                <h4 className="text-gray-500 text-sm">{title}</h4>
                <p className="text-2xl font-semibold text-gray-800">{value}</p>
            </div>
            <div className={`p-3 rounded-full text-white ${color}`}>
                {icon}
            </div>
        </div>
    )
}

export default OverviewCards;