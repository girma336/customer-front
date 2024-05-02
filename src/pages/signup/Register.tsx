import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserData {
  phone_number: string,
  PIN: string,
  device_code: string
}

const Register = () => {
  const [ phone_number, setPhone] = useState('')
  const [PIN, setPIN] = useState('')
  const [device_code, setDeviceCode] = useState('')
  const navigate = useNavigate();
  const { mutate, data, isPending, isError, isSuccess } = useMutation({
    mutationFn: (userData: UserData) => 
       fetch("http://localhost:3000/api/v1/customer/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json()),
      onSuccess: (response) => {
        if (response.status === 'success') {
            toast.success(response.message)
            navigate('/login')
            
        } else {
          toast.error(response.message)
        }
      },
  });
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);
  
    const deviceID = `${userAgent}-${platform}`;
    console.log("girma", deviceID, )
    setDeviceCode(deviceID);
    }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      phone_number,
      PIN,
      device_code,
    };

    mutate(userData)
  }
  return (
    <div className="container mx-auto p-4 w-[350px] sm:w-[500px] rounded-xl mt-10 border border-gray-500">
     <ToastContainer />
      <h1 className='mb-4 text-2xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-3'>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone_number" 
            type="text" 
            placeholder="Enter your Phone Number" 
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           id="PIN" 
           type="text" 
           placeholder="Enter your PIN"
           value={PIN}
           onChange={(e) => setPIN(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          type="submit" disabled={isPending}>
          {isPending ? 'Sign up...' : 'Submit'}
        </button>
        <div className='p-4'>If you have an account <span className='text-[#8b5cf6] ml-2'><Link to="/login">LogIn</Link></span></div>
        { (isError || (isSuccess && !data?.status ) ) && <div className='text-red-500'>{data?.message}</div>}
        { (isSuccess && data.status === "success" ) && <div className='text-green-500'>Login successful!</div>}
      </form>
    </div>
  )
}

export default Register