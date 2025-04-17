import React, { useState } from 'react';
import { BiBarChartAlt2, BiBug, BiCheckCircle, BiHome, BiMapPin, BiUserCheck } from 'react-icons/bi';
import { FaUserSecret } from 'react-icons/fa';
import { FiFilePlus, FiSettings } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', icon: <BiHome className='size-5' />, path: '/admin/dashboard' },
  { label: 'New Reports', icon: <FiFilePlus className='size-5' />, path: '/admin/new-reports' },
  // { label: 'Active Cases', icon: <BiBug className='size-5' />, path: '/admin/active-cases' },
  // { label: 'Resolved Cases', icon: <BiCheckCircle className='size-5' />, path: '/admin/resolved-cases' },
  // { label: 'Assign Technician', icon: <BiUserCheck className='size-5' />, path: '/admin/assign-tech' },
  // { label: 'Map View', icon: <BiMapPin className='size-5' />, path: '/admin/map' },
  // { label: 'Analytics', icon: <BiBarChartAlt2 className='size-5' />, path: '/admin/analytics' },
  // { label: 'User Management', icon: <FaUserSecret className='size-5' />, path: '/admin/users' },
  // { label: 'Settings', icon: <FiSettings className='size-5' />, path: '/admin/settings' },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 bg-gray-800 text-white p-4 shadow-lg">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`w-full flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
