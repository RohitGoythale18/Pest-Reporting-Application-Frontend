import React from 'react';
import OverviewCards from './OverviewCards';
import { FiFilePlus } from 'react-icons/fi';
import { BiBug, BiCalendarMinus, BiCheckCircle } from 'react-icons/bi';

const Overview = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <OverviewCards
                title="Total Reports"
                value="1,250"
                icon={<FiFilePlus size={24} />}
                color="bg-indigo-500"
            />
            <OverviewCards
                title="New This Week"
                value="230"
                icon={<BiCalendarMinus size={24} />}
                color="bg-yellow-500"
            />
            <OverviewCards
                title="Active Cases"
                value="415"
                icon={<BiBug size={24} />}
                color="bg-orange-500"
            />
            <OverviewCards
                title="Resolved Cases"
                value="605"
                icon={<BiCheckCircle size={24} />}
                color="bg-green-500"
            />
        </div>
    )
}

export default Overview;