import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Dissertation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [comment, setComment] = useState('');

  const user = useSelector((state) => state.user.user);

  const fetchDissertations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/dissertations/');
      setData(response.data);
    } catch (error) {
      setError('Failed to fetch dissertations');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDissertations();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/dissertations/${id}/`, { status: newStatus });
      fetchDissertations(); // Refresh data after updating
    } catch (error) {
      setError('Failed to update status');
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/dissertations/${id}/comments/`, { comment });
      fetchDissertations(); // Refresh data after submitting comment
      setComment(''); // Clear comment input
    } catch (error) {
      setError('Failed to submit comment');
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const StatusDropdown = ({ id, currentStatus }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const statusOptions = ['PENDING', 'APPROVED', 'REJECTED'];

    return (
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-blue-500 focus:outline-none"
        >
          {currentStatus}
        </button>
        {dropdownOpen && (
          <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
            {statusOptions.map((status) => (
              <div
                key={status}
                onClick={() => {
                  handleStatusChange(id, status);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {status}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const CommentInput = ({ id }) => (
    <div className="flex items-center mt-2 w-40">
      <input
        type="text"
        placeholder="Add comment..."
        value={comment}
        onChange={handleCommentChange}
        className="px-4 py-2 border rounded mr-2"
      />
      <button
        onClick={() => handleCommentSubmit(id)}
        className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.student.firstname,
      sortable: true,
    },
    {
      name: "Surname",
      selector: (row) => row.student.surname,
      sortable: true,
    },
    {
      name: "Registration Number",
      selector: (row) => row.student.regno,
      sortable: true,
    },
    {
      name: "Course",
      selector: (row) => row.student.course,
      sortable: true,
    },
    {
      name: "Dissertation Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "File",
      selector: (row) => row.file,
      cell: (row) => row.file ? <a href={row.file} target="_blank" rel="noopener noreferrer">View Dissertation</a> : "No File",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => <StatusDropdown id={row.id} currentStatus={row.status} />,
      sortable: true,
    },
    {
      name: "Comments",
      cell: (row) => (user && (user.role !== 'STUDENT' && user.role !== 'ADMIN')) ? <CommentInput id={row.id} /> : null,
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <div className="ml-64">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search Dissertation Title..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border rounded"
        />
      </div>
      <div>
        {error && <p>{error}</p>}
        <DataTable
          columns={columns}
          data={filteredData}
          fixedHeader
          pagination
          progressPending={loading}
        />
      </div>
    </div>
  );
}

export default Dissertation;
