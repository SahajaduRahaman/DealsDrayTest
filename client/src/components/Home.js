import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const HandleClick = () => {
    navigate("/create_employee")
  }
  return (
    <div className='flex flex-col h-screen text-stone-800'>
      <div className='flex justify-between p-5'>
        <h1 className='text-xl font-medium text-stone-300'>Dashboard</h1>
        <button className='rounded-md px-4 py-2 text-center bg-sky-700 text-white outline-none shadow-md' onClick={HandleClick}>Create Employee</button>
      </div>
      <div className='p-5 mx-auto my-40'>
        <h1 className='text-7xl font-bold text-white'>Welcome To Admin Pannel</h1>
      </div>
    </div>
  )
}

export default Home