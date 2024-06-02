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
    console.log(courseId);
    navigate(`/${courseId}/students`);
  };

  return (
    <div className="ml-64 p-4">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="flex flex-wrap gap-4">
        {data.map((course, index) => (
          
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
            onClick={() => handleCourseClick(course.id)}
          >
            <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
            <p className="text-gray-700"><strong>Department:</strong> {course.department.name}</p>
            <p className="text-gray-700"><strong>Year:</strong> {course.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
