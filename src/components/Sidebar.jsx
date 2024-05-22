import React from 'react'


function Sidebar() {
  return (
    <div className='w-64 bg-gray-800 fixed h-screen px-4 py-2'>
        <div className='my-2 mb-4'>
            <h1 className='text-white text-2xl font-bold'>Database Management</h1>
        </div>
        <hr/>
        <ul className='mt-3 text-white font-bold'>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='/' className='px-3'>
                    Dashboard
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='/' className='px-3'>
                    Departments
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='/' className='px-3'>
                    Courses
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='/student' className='px-3'>
                    Students
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='/supervisors' className='px-3'>
                    Supervisors
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='/dissertations' className='px-3'>
                    Dissertations
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='/settings' className='px-3'>
                    Settings
                </a>
            </li>
           
        </ul>
    </div>
  )
}

export default Sidebar