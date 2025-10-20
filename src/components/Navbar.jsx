import React from 'react'
import Logo from './Logo'
import { FaGithub } from "react-icons/fa";

const Navbar = () => {

  return (
    <nav className=' flex md:justify-around justify-between md:py-5 py-2 px-5 items-center z-10  bg-gray-900 text-white w-full '>


      <div className="logo pl-3">
        <Logo />
      </div>
      <div className='flex gap-2 items-center  justify-between rounded-full pr-2 py-0.5 bg-green-700 '>
        <FaGithub className='w-8 h-8'/>
        <span>
          GitHub
        </span>
      </div>
    </nav>
  )
}

export default Navbar
