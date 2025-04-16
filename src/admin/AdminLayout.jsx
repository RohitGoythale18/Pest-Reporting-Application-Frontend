import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    const location = useLocation();

    const hideLayout = location.pathname === '/admin/login' || location.pathname === '/admin/register';

    return hideLayout ? (
        <Outlet />
    ) : (
        <div className="min-h-screen flex flex-col">
            <Header heading="Pest Reporting Service" />

            <div className="flex flex-1">
                <aside className="w-64 bg-gray-800 text-white">
                    <AdminSidebar />
                </aside>

                <main className="flex-1 p-4 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
