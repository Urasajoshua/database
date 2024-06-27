import React, { useEffect, useState } from 'react';

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
            <div className='my-4 mb-6'>
                <h1 className='text-white text-2xl font-bold'>Database Management</h1>
            </div>
            <hr className='border-gray-700' />
            <ul className='mt-6 text-white font-semibold'>
                <li className='mb-3 rounded hover:bg-blue-600 hover:shadow-lg py-3 transition duration-200 ease-in-out'>
                    <a href='/' className='block px-3'>
                        Dashboard
                    </a>
                </li>
                <li className='mb-3 rounded hover:bg-blue-600 hover:shadow-lg py-3 transition duration-200 ease-in-out'>
                    <a href='/departments' className='block px-3'>
                        Departments
                    </a>
                </li>
                <li className='mb-3 rounded hover:bg-blue-600 hover:shadow-lg py-3 transition duration-200 ease-in-out'>
                    <a href='/courses' className='block px-3'>
                        Program
                    </a>
                </li>
                <li className='mb-3 rounded hover:bg-blue-600 hover:shadow-lg py-3 transition duration-200 ease-in-out'>
                    <a href='/dissertations' className='block px-3'>
                        Dissertations
                    </a>
                </li>
                {userRole !== 'SUPERVISOR' && (
                <li className='mb-3 rounded hover:bg-blue-600 hover:shadow-lg py-3 transition duration-200 ease-in-out'>
                    <a href='/settings' className='block px-3'>
                        Settings
                    </a>
                </li>)}
                
                {userRole === 'SUPERVISOR' && (
                    <li className='mb-3 rounded hover:bg-blue-600 hover:shadow-lg py-3 transition duration-200 ease-in-out'>
                        <a href='/students' className='block px-3'>
                            My Students
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
