import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Courses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://64.23.247.7:8000/auth/courses/');
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch courses');
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/${courseId}/students`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="md:ml-64 p-6 bg-orange-900 min-h-screen"
    >
      <div className="flex justify-between items-center mb-6">
        {loading && <p className="text-blue-500">Loading...</p>}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((course, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleCourseClick(course.id)}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{course.name}</h3>
            <p className="text-gray-600 mb-1"><strong>Department:</strong> {course.department.name}</p>
            <p className="text-gray-600"><strong>Year:</strong> {course.year}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Courses;
