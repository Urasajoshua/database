import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useSelector } from 'react-redux';

function VerifiedDissertations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const user = useSelector((state) => state.user.user);

  const fetchVerifiedDissertations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://gamerlastborn.pythonanywhere.com/auth/verified/');
      setData(response.data);
    } catch (error) {
      setError('Failed to fetch verified dissertations');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVerifiedDissertations();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
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
      name: "Dissertation Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "File",
      selector: (row) => row.file,
      cell: (row) => row.file ? <a href={row.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Dissertation</a> : "No File",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="ml-64 p-6 bg-orange-900 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search Dissertation Title..."
            value={search}
            onChange={handleSearch}
            className="px-4 py-2 border rounded w-full"
          />
        </div>
        <div>
          {error && <p className="text-red-500">{error}</p>}
          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            pagination
            progressPending={loading}
            className="shadow-lg"
            highlightOnHover
            customStyles={{
              header: {
                style: {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'rgba(0, 0, 0, 0.87)',
                },
              },
              headRow: {
                style: {
                  backgroundColor: '#f3f4f6',
                },
              },
              rows: {
                highlightOnHoverStyle: {
                  backgroundColor: '#f3f4f6',
                  borderBottomColor: '#FFFFFF',
                  outline: '1px solid #FFFFFF',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VerifiedDissertations;
