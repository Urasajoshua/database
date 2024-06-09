import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchStudents = async ({ queryKey }) => {
  const [_key, { courseId, page }] = queryKey;
  const response = await axios.get(`http://127.0.0.1:8000/auth/courses/${courseId}/students?page=${page}`);
  return response.data;
};

function Students() {
  const { courseId } = useParams();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['students', { courseId, page }],
    queryFn: fetchStudents,
    keepPreviousData: true,
  });

  const filteredStudents = students?.filter((student) => {
    const fullName = `${student.firstname} ${student.surname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="ml-64 p-4">
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      <div>
        <h2 className="text-xl font-semibold mb-4">List of Students</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg. Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dissertation Title</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents?.map((student, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{student.firstname} {student.surname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.RegNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.dissertations[0]?.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            disabled={!students || students.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Students;
