import React from 'react'
import DataTable from 'react-data-table-component';

function Dissertation() {
    const columns = [
        {
          name: "firstname",
          selector: (row) => row.firstname,
          sortable: true,
        },
        {
          name: "middlename",
          selector: (row) => row.middlename,
          sortable: true,
        },
        {
          name: "surname",
          selector: (row) => row.surname,
          sortable: true,
        },
        {
          name: "dissertation title",
          selector: (row) => row.dissertation,
          sortable: true,
        },
        {
          name: "course",
          selector: (row) => row.course,
          sortable: true,
        },
        {
          name: "Registration Number",
          selector: (row) => row.registration,
          sortable: true,
        },
    
        {
          name: "supervisors",
          selector: (row) => row.supervisors,
          sortable: true,
        },
      ];
    
      const data = [
        {
          id: 1,
          firstname: "joshua",
          middlename: "jjjd",
          surname: "urasa",
          course: "gm",
          registration: 254,
          year: 4,
          supervisors: "mr urasa",
          dissertation: "smart home security",
        },
        {
          id: 2,
          firstname: "erick",
          middlename: "jjjd",
          surname: "urasa",
          course: "gm",
          registration: 254,
          year: 4,
          supervisors: "mr urasa",
          dissertation: "database management",
        },
        {
            id: 2,
            firstname: "erick",
            middlename: "jjjd",
            surname: "urasa",
            course: "gm",
            registration: 254,
            year: 4,
            supervisors: "mr urasa",
            dissertation: "database management",
          },
          {
            id: 2,
            firstname: "erick",
            middlename: "jjjd",
            surname: "urasa",
            course: "gm",
            registration: 254,
            year: 4,
            supervisors: "mr urasa",
            dissertation: "database management",
          },
          {
            id: 2,
            firstname: "erick",
            middlename: "jjjd",
            surname: "urasa",
            course: "gm",
            registration: 254,
            year: 4,
            supervisors: "mr urasa",
            dissertation: "database management",
          },
          {
            id: 2,
            firstname: "erick",
            middlename: "jjjd",
            surname: "urasa",
            course: "gm",
            registration: 254,
            year: 4,
            supervisors: "mr urasa",
            dissertation: "database management",
          },
          {
            id: 2,
            firstname: "erick",
            middlename: "jjjd",
            surname: "urasa",
            course: "gm",
            registration: 254,
            year: 4,
            supervisors: "mr urasa",
            dissertation: "database management",
          },
      ];
    
     
    
      return (
        <div className="ml-64">
          <div>
            <DataTable columns={columns} data={data} fixedHeader pagination />
          </div>
        </div>
      );
    }

export default Dissertation