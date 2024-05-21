import React from 'react'
import './index.css'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className='flex'>
      <Dashboard/>
      <Sidebar/>
    </div>
  )
}

export default App