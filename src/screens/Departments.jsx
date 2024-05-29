import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function Departments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Department Name",
      selector: (row) => row.name,
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
    <div className="ml-64">
      <div>
        {error && <p>{error}</p>}
        <DataTable
          columns={columns}
          data={data}
          fixedHeader
          pagination
          progressPending={loading}
        />
      </div>
    </div>
  );
}

export default Departments;
