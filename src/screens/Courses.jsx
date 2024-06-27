import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

function Courses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/auth/courses/');
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
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        {loading && <p className="text-blue-500">Loading...</p>}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleCourseClick(course.id)}
          >
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{course.name}</h3>
            <p className="text-gray-600 mb-1"><strong>Department:</strong> {course.department.name}</p>
            <p className="text-gray-600"><strong>Year:</strong> {course.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
