import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaBell, FaUser } from 'react-icons/fa';
import { TbMinusVertical } from 'react-icons/tb';

const Header = ({ heading }) => {
    return (
        <header className="bg-gray-800 text-white py-2 px-5 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{heading}</h1>
            <nav>
                <ul className="flex items-center space-x-4">
                    <Link to='' className='py-4 px-4 rounded-md bg-gray-600 hover:bg-gray-700 transition duration-300'>
                        <FaBell className='size-4' />
                    </Link>
                    <Link to='' className='flex items-center px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 transition duration-300'>
                        <FaUser className='size-4' />
                        <TbMinusVertical className='size-7' />
                        <span>
                            Admin Name
                        </span>
                        <FaAngleDown className='mt-1 ml-1' />
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header;