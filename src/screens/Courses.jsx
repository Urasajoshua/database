import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function Courses() {
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
      name: "Course Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Department Name",
      selector: (row) => row.department.name,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
  ];

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

export default Courses;
