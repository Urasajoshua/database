import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

function Sidebar() {
    const [userRole, setUserRole] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role) {
            setUserRole(user.role);
        }
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div>
            {/* Hamburger button */}
            <div className="md:hidden p-4 bg-gray-900 z-50 relative">
                <button onClick={toggleSidebar} className="text-white">
                    <FaBars />
                </button>
            </div>
            {/* Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={closeSidebar}
                ></div>
            )}
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-gray-900 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64 w-64 p-4 z-50`}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <img src='/1.png' alt='Logo' className='h-8 mr-1' /> {/* Adjust the path to your logo */}
                        <h1 className='text-white text-xl font-bold'>Database Management</h1>
                    </div>
                    <button onClick={closeSidebar} className="text-white md:hidden">
                        <FaTimes />
                    </button>
                </div>
                <hr className='border-gray-700' />
                <ul className='mt-6 text-white font-semibold'>
                    <motion.li
                        className='mb-3 rounded py-3'
                        whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    >
                        <a href='/' className='block px-3' onClick={closeSidebar}>
                            Dashboard
                        </a>
                    </motion.li>
                    <motion.li
                        className='mb-3 rounded py-3'
                        whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    >
                        <a href='/departments' className='block px-3' onClick={closeSidebar}>
                            Departments
                        </a>
                    </motion.li>
                    <motion.li
                        className='mb-3 rounded py-3'
                        whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    >
                        <a href='/courses' className='block px-3' onClick={closeSidebar}>
                            Program
                        </a>
                    </motion.li>
                    <motion.li
                        className='mb-3 rounded py-3'
                        whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    >
                        <a href='/dissertations' className='block px-3' onClick={closeSidebar}>
                            Dissertations
                        </a>
                    </motion.li>
                    {userRole !== 'SUPERVISOR' && (
                        <motion.li
                            className='mb-3 rounded py-3'
                            whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                        >
                            <a href='/settings' className='block px-3' onClick={closeSidebar}>
                                Settings
                            </a>
                        </motion.li>
                    )}
                    {userRole === 'SUPERVISOR' && (
                        <motion.li
                            className='mb-3 rounded py-3'
                            whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                        >
                            <a href='/students' className='block px-3' onClick={closeSidebar}>
                                My Students
                            </a>
                        </motion.li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
