import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {
    return (
        <div className='ml-64 mt-4' >
            <div className='flex justify-evenly'>
                <Link to="/addStudent">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Student
                    </button>
                </Link>
                <Link to="/addSupervisors">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Supervisor
                    </button>
                </Link>
                <Link to="/addDissertation">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Dissertation
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Settings;
