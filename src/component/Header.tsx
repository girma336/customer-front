import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AutoProvider';
import { FaBars, FaWindowClose } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const { user, logout } = useAuth();
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => setToggle(!toggle)
  const handleClose = () => setToggle(!toggle)
  return (
    <div className='h-[70px] w-full bg-[#334155]'>
        <div className='flex justify-between items-center h-full ml-4'>
            <div className='text-[#fafaf9] text-3xl'>Customer Account</div>
            <div>
            { !toggle && <div className='block md:hidden mr-3 text-white text-3xl' onClick={handleToggle}><FaBars /></div>}
            { toggle && <div className='block md:hidden mr-3 text-white text-3xl' onClick={handleClose}><IoMdClose /></div>}

            </div>
            <div className={`${toggle ? 'flex flex-col bg-[#3c424b] fixed left-0 top-0 h-[100vh] w-[300px] pt-[100px]' : 'hidden md:block'}`}>
                
                { user ? (
                <div className={`${toggle ? 'block': 'flex justify-center items-center'}`}>
                  <div className={`${toggle ? 'text-lg text-white mb-5': 'text-[#a78963] p-2 mr-4 text-2xl'}`}>{user?.email}</div>
                  <div onClick={() => logout()} className='bg-[#fafaf9] p-2 mr-4 text-xl rounded-lg shadow-sm shadow-white hover:bg-white transition duration-300 transform hover:scale-110 ml-3'><Link to='/login'>LogOut</Link></div>
                </div>
                ) : (
                <div className='bg-[#fafaf9] p-2 mr-4 text-xl rounded-lg shadow-sm shadow-white hover:bg-white transition duration-300 transform hover:scale-110'><Link to='/login' >LogIn</Link></div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Header