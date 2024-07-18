import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Sidebar() {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Get the user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role) {
            setUserRole(user.role);
        }
    }, []);

    return (
        <div className='w-64 bg-gray-900 fixed h-screen px-4 py-6'>
            <div className='my-4 mb-6 flex items-center'>
                <img src='/1.png' alt='Logo' className='h-8 mr-1' /> {/* Adjust the path to your logo */}
                <h1 className='text-white text-xl font-bold'>Database Management</h1>
            </div>
            <hr className='border-gray-700' />
            <ul className='mt-6 text-white font-semibold'>
                <motion.li
                    className='mb-3 rounded py-3'
                    whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                >
                    <a href='/' className='block px-3'>
                        Dashboard
                    </a>
                </motion.li>
                <motion.li
                    className='mb-3 rounded py-3'
                    whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                >
                    <a href='/departments' className='block px-3'>
                        Departments
                    </a>
                </motion.li>
                <motion.li
                    className='mb-3 rounded py-3'
                    whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                >
                    <a href='/courses' className='block px-3'>
                        Program
                    </a>
                </motion.li>
                <motion.li
                    className='mb-3 rounded py-3'
                    whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                >
                    <a href='/dissertations' className='block px-3'>
                        Dissertations
                    </a>
                </motion.li>
                {userRole !== 'SUPERVISOR' && (
                    <motion.li
                        className='mb-3 rounded py-3'
                        whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    >
                        <a href='/settings' className='block px-3'>
                            Settings
                        </a>
                    </motion.li>
                )}
                {userRole === 'SUPERVISOR' && (
                    <motion.li
                        className='mb-3 rounded py-3'
                        whileHover={{ scale: 1.05, backgroundColor: '#2563eb', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    >
                        <a href='/students' className='block px-3'>
                            My Students
                        </a>
                    </motion.li>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
