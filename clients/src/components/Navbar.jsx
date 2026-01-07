import React from 'react'
import logo from '../../public/favicon.svg'

const Navbar = () => {
  return (
    <div className='h-15 w-full md:w-9/12 mx-auto bg-gray-300 px-2 py-1 fixed top-0 flex justify-between'>
        <img src={logo} alt="" className='h-full'/>
        <ul className='flex justify-center items-center gap-3 px-3'>
            <li className='px-2 py-1 rounded-sm bg-yellow-50 '>Home</li>
            <li className='px-2 py-1 rounded-sm bg-yellow-50 '>Tools</li>
            <li className='px-2 py-1 rounded-sm bg-yellow-50 '>About</li>
            <li className='px-2 py-1 rounded-sm bg-yellow-50 '>Contact</li>
        </ul>
    </div>
  )
}

export default Navbar