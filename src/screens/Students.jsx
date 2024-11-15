import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PAGE_SIZE = 10; // Number of students per page

function Students() {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  // Fetch students data once on component mount
  useEffect(() => {
    fetchStudents();
  }, [courseId]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`https://gamerlastborn.pythonanywhere.com/auth/courses/${courseId}/students`);
      setStudents(response.data);
      setTotalPages(Math.ceil(response.data.length / PAGE_SIZE));
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const filteredStudents = students
    .filter(student => {
      const fullName = `${student.firstname} ${student.surname}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to the first page on search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-orange-900 min-h-screen md:ml-64 ">
      <div className="mb-6">
        <div className="flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg. Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dissertation Title</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{student.firstname} {student.surname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.RegNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.dissertations[0]?.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Students;
