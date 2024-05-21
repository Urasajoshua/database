import React from 'react'

function Navbar() {
  return (
    <div className='flex bg-gray-800 px-4 justify-between'>
        <div className='flex items-center text-xl'>
            <h1 className='text-font font-semibold'>Aru</h1>
        </div>
        <div className='flex items-center gap-x-5'>
            <div className='relative md:w-64'>
                <span>
                    <button className='p-1 focus:outline-none'>search</button>
                </span>
                <input type='text'/>
            </div>
        </div>
    </div>
  )
}

export default Navbar