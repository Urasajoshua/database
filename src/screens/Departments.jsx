import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Departments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      sortable: true,
      width: '80px',
    },
    {
      name: "Department Name",
      selector: (row) => (
        <Link to={`/courses/`} className="text-blue-500 hover:underline">
          {row.name}
        </Link>
      ),
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/auth/departments/');
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch departments');
      }
      setLoading(false);
    };

    fetchDepartments();
  }, []);

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Departments</h2>
        <div>
          {error && <p className="text-red-500">{error}</p>}
          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            progressPending={loading}
            className="shadow-lg"
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

export default Departments;