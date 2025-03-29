import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="text-xl font-bold">Pest Reporting</h1>
            <div>
                <Link className="mr-4" to="/">Home</Link>
                <Link className="mr-4" to="/report">Report</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </nav>
    )
}

export default Navbar;