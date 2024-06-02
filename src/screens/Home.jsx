import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState({
    departments: 0,
    courses: 0,
    dissertations: 0,
    verifiedDissertations: 0,
    unverifiedDissertations: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/auth/api/dashboard-data/')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='ml-64 mt-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-10">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Departments</h3>
          <p className="text-3xl font-bold">{data.departments}</p>
        </div>
        <div
          className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer"
          onClick={() => navigate('/courses')}
        >
          <h3 className="text-lg font-semibold mb-2">Courses</h3>
          <p className="text-3xl font-bold">{data.courses}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Dissertations</h3>
          <p className="text-3xl font-bold">{data.dissertations}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Verified Dissertations</h3>
          <p className="text-3xl font-bold">{data.verifiedDissertations}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Unverified Dissertations</h3>
          <p className="text-3xl font-bold">{data.unverifiedDissertations}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
