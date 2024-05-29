import React from 'react';

function Home() {
    // Mock data for departments, courses, dissertations, verified, and unverified dissertations
    const departments = 10;
    const courses = 25;
    const dissertations = 100;
    const verifiedDissertations = 70;
    const unverifiedDissertations = 30;

    return (
        <div className='ml-64 mt-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-10">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Departments</h3>
                    <p className="text-3xl font-bold">{departments}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Courses</h3>
                    <p className="text-3xl font-bold">{courses}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Dissertations</h3>
                    <p className="text-3xl font-bold">{dissertations}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Verified Dissertations</h3>
                    <p className="text-3xl font-bold">{verifiedDissertations}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Unverified Dissertations</h3>
                    <p className="text-3xl font-bold">{unverifiedDissertations}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
