import React from 'react'


function Sidebar() {
  return (
    <div className='w-64 bg-gray-800 fixed h-screen px-4 py-2'>
        <div className='my-2 mb-4'>
            <h1 className='text-white text-2xl font-bold'>Admin Dashboard</h1>
        </div>
        <hr/>
        <ul className='mt-3 text-white font-bold'>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='' className='px-3'>
                    Home
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='' className='px-3'>
                    Home
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='' className='px-3'>
                    Home
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='' className='px-3'>
                    Home
                </a>
            </li>
            <li className='mb-2 rounded hover:bg-blue-500 hover:shadow py-2'>
                <a href='' className='px-3'>
                    Home
                </a>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar