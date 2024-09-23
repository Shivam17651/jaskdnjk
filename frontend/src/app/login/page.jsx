'use client'
import React from 'react'
import { ImFacebook } from "react-icons/im";
import { FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import app_config from '@/config';


const Login = () => {

  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values);

      axios.post(app_config.api_url+'/user/authenticate', values)
        .then((result) => {
          toast.success('Logged in successfully');
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('user', JSON.stringify(result.data));
          router.push('/manage-room');
        }).catch((err) => {
          console.log(err);
          toast.error('Invalid Credentials');
        });
    }
  })

  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-r from-blue-200 to-red-200 w-full flex-1  text-center '>

        <div className='p-5 col-span-12 lg:col-span-6 w-full'>   
          <div className='text-center font-bold'>
            <span className='text-red-500'>HANDS UP</span>  POLLS
          </div>
          <div className='py-10'>
            <h2 className='text-3xl font-bold text-blue-500 mb-2'>Login to your Account</h2>
            <div className='border-2 w-10 border-red-500 rounded-lg inline-block mb-2'></div>
            <div className='flex justify-center my-2'>
              <a href="#" className='border-2 border-red-500 rounded-full p-3 mx-1 text-sm'><ImFacebook /></a>
              <a href="#"></a>
              <a href="#" className='border-2 border-red-500 rounded-full p-3 mx-1 text-sm'><FaLinkedinIn /></a>
              <a href="#"></a>
              <a href="#" className='border-2 border-red-500 rounded-full p-3 mx-1 text-sm'><FaGoogle /></a>
              <a href="#"></a>
            </div>
            <p className='text-blue-400 my-3 mt-5'>or use your email account</p>
            <form className='border-red-500' 
            onSubmit={loginForm.handleSubmit}>

              <div className='flex flex-col items-center mt-10'>
                <div className='bg-gray-100 w-64 max-w-[90%] p-2 flex items-center space-x-2'>
                  <FaRegEnvelope className='text-gray-400' />
                  <input
                    id='email'
                    onChange={loginForm.handleChange}
                    value={loginForm.values.email}
                    type="email" placeholder='Email' 
                    className='bg-gray-100 outline-none flex-1 text-sm w-full'  />
                </div>
                <div className='bg-gray-100 w-64 max-w-[90%] p-2 flex items-center space-x-2 mt-3'>
                  <MdLockOutline className='text-gray-400' />
                  <input
                    id='password'
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                    type="password" placeholder='Password' className='bg-gray-100 outline-none flex-1 text-sm w-full' />
                </div>

                <div className=' w-full flex-col sm:flex-row sm:justify-between mt-5 items-center'>
                  <label className=' itmes-center text-xs'><input type="checkbox" className='mr-1' />Remember me</label>
                  <br />
                  <a href="#" className='text-xs'>Forgot Password?</a>
                </div>
              </div>
              <button type='submit' className='border-2 border-red-600  rounded-full px-12 py-2 inline-block mt-10 font-semibold hover:bg-blue-600 hover:text-white'>Login</button>
            </form>
          </div>
        </div>

      </div>
    
  )
}

export default Login