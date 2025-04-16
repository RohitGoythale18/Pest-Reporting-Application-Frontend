import React from 'react';
import Overview from './Overview';
import ReportsTable from './ReportsTable';
import MapSection from './MapSection';
import ReportTrends from './ReportTrends';

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-10 py-5'>
      <Overview />
      <ReportsTable />
      <MapSection />
      <ReportTrends />
    </div>
  )
}

export default Dashboard;