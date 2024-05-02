import React, { useState } from 'react'
import { useAuth } from '../context/AutoProvider'

const Dashboard = () => {
  const { user, token } = useAuth();

  return (
    <div className='w-full'>
      <div className='flex justify-center text-3xl mt-4'>
        Welcome : {user?.full_name}
      </div>
      <div className='w-full flex justify-center flex-wrap'>
          
      </div>
      
    
    </div>
  )
}

export default Dashboard