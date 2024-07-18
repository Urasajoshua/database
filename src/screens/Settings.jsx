import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {
    const user = JSON.parse(localStorage.getItem('user')); // Get user data from local storage
    const userRole = user?.role;

    return (
        <div className="ml-64 p-6 bg-orange-900 min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0">
                    {userRole === 'ADMIN' && (
                        <React.Fragment>
                            <Link to="/addStudent">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                    Add Student
                                </button>
                            </Link>
                            <Link to="/addSupervisors">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105 ml-4">
                                    Assigns student to supervisors
                                </button>
                            </Link>

                            <Link to="/Supervisors">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105 ml-4">
                                    Add Supervisor
                                </button>
                            </Link>
                        </React.Fragment>
                    )}
                    {userRole !== 'ADMIN' && userRole !== 'SUPERVISOR' && (
                        <Link to="/addDissertation">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                Add Dissertation
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
