import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function Students() {
    const [data, setData] = useState([]);

    const columns = [
        { name: 's/n', selector: row => row.id, sortable: true },
        { name: 'firstname', selector: row => row.firstname, sortable: true },
        { name: 'lastname', selector: row => row.lastname, sortable: true },
        { name: 'surname', selector: row => row.surname, sortable: true },
        { name: 'course', selector: row => row.course, sortable: true },
        { name: 'Registration Number', selector: row => row.registration, sortable: true },
        { name: 'year', selector: row => row.year, sortable: true },
        { name: 'supervisors', selector: row => row.supervisors, sortable: true },
    ];

    const handleRowClick = (row) => {
        console.log('Clicked Row Data:', row);
    };

    useEffect(() => {
        const supervisorId = localStorage.getItem('supervisorId');
        if (supervisorId) {
            axios.get(`http://127.0.0.1:8000/auth/supervisor/${supervisorId}/students/`)
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching students:', error);
                });
        }
    }, []);

    return (
        <div className='ml-64'>
            <div>
                <DataTable
                    columns={columns}
                    data={data}
                    onRowClicked={handleRowClick}
                />
            </div>
        </div>
    );
}

export default Students;
