import React from 'react';
import DataTable from 'react-data-table-component';

function Students() {

    const columns = [
        {
            name: 's/n',
            selector: row => row.id
        },
        {
            name:'firstname',
            selector: row => row.firstname
        },
        {
            name:'lastname',
            selector: row => row.lastname
        },
        {
            name:'surname',
            selector: row => row.surname
        },
        {
            name:'course',
            selector: row => row.course
        },
        {
            name:'Registration Number',
            selector: row => row.registration
        },
        {
            name:'year',
            selector: row => row.year
        },
        {
            name:'supervisors',
            selector: row => row.supervisors
        }
    ];

    const data = [
        {
            id:1,
            firstname:'joshua',
            lastname:'jjjd',
            surname:'urasa',
            course:'gm',
            registration:254,
            year:4,
            supervisors:'mr urasa'
        },
        {
            id:2,
            firstname:'joshua',
            lastname:'jjjd',
            surname:'urasa',
            course:'gm',
            registration:254,
            year:4,
            supervisors:'mr urasa'
        },
    ];

    const handleRowClick = (row) => {
        // Handle row click here, you can access row data using 'row' parameter
        console.log('Clicked Row Data:', row);
    };
  
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
