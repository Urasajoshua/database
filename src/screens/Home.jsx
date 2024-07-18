import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

  const handleNavigateToCourses = () => {
    navigate('/courses');
  };

  const handleNavigateToDepartments = () => {
    navigate('/departments');
  };

  const handleNavigateToDissertations = () => {
    navigate('/dissertations');
  };

  const handleNavigateToVerified = () => {
    navigate('/verified');
  };

  const handleNavigateToUnverified = () => {
    navigate('/unverified');
  };

  return (
    <div className='ml-64 bg-orange-900 min-h-screen'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mx-10 py-10">
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
          onClick={handleNavigateToDepartments}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-2">Departments</h3>
          <p className="text-4xl font-bold text-blue-600 hover:text-blue-700">{data.departments}</p>
        </motion.div>
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
          onClick={handleNavigateToCourses}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-2">Program</h3>
          <p className="text-4xl font-bold text-green-600 hover:text-green-700">{data.courses}</p>
        </motion.div>
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
          onClick={handleNavigateToDissertations}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold mb-2">Dissertations</h3>
          <p className="text-4xl font-bold text-purple-600 hover:text-purple-700">{data.dissertations}</p>
        </motion.div>
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={handleNavigateToVerified}
        >
          <h3 className="text-xl font-semibold mb-2">Verified Dissertations</h3>
          <p className="text-4xl font-bold text-indigo-600 hover:text-indigo-700">{data.verifiedDissertations}</p>
        </motion.div>
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={handleNavigateToUnverified}
        >
          <h3 className="text-xl font-semibold mb-2">Unverified Dissertations</h3>
          <p className="text-4xl font-bold text-red-600 hover:text-red-700">{data.unverifiedDissertations}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
