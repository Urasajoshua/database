import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {
    const user = JSON.parse(localStorage.getItem('user')); // Get user data from local storage
    const userRole = user?.role;

    return (
        <div className="p-6 bg-orange-900 min-h-screen md:ml-64">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-around space-y-4 md:space-y-0">
                    {userRole === 'ADMIN' && (
                        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                            <Link to="/addStudent" className="flex-grow">
                                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                    Add Student
                                </button>
                            </Link>
                            <Link to="/addSupervisors" className="flex-grow">
                                <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                    Assign Student to Supervisors
                                </button>
                            </Link>
                            <Link to="/Supervisors" className="flex-grow">
                                <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                    Add Supervisor
                                </button>
                            </Link>
                        </div>
                    )}
                    {userRole !== 'ADMIN' && userRole !== 'SUPERVISOR' && (
                        <div className="flex flex-col space-y-4 md:space-y-0">
                            <Link to="/addDissertation">
                                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                    Add Dissertation
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
