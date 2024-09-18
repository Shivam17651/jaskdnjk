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


const Login = () => {

  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values);

      axios.post('http://localhost:5000/user/authenticate', values)
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
    <div className='flex h-screen items-center justify-center bg-neutral-950 w-full flex-1 px-20 text-center'>

      <div className='bg-white rounded-2xl shadow-2xl flex md:flex-row flex-col-reverse w-2/3 max-w-4xl'>
        <div className='w-3/5 p-5 '>
          <div className='text-left font-bold'>
            <span className='text-gray-500'>Gray</span>Poll
          </div>
          <div className='py-10'>
            <h2 className='text-3xl font-bold text-gray-500 mb-2'>Login to your Account</h2>
            <div className='border-2 w-10 border-gray-500 rounded-lg inline-block mb-2'></div>
            <div className='flex justify-center my-2'>
              <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1 text-sm'><ImFacebook /></a>
              <a href="#"></a>
              <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1 text-sm'><FaLinkedinIn /></a>
              <a href="#"></a>
              <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1 text-sm'><FaGoogle /></a>
              <a href="#"></a>
            </div>
            <p className='text-gray-400 my-3'>or use your email account</p>
            <form onSubmit={loginForm.handleSubmit}>

              <div className='flex flex-col items-center'>
                <div className='bg-gray-100 w-64 p-2 flex items-center space-x-2'>
                  <FaRegEnvelope className='text-gray-400' />
                  <input
                    id='email'
                    onChange={loginForm.handleChange}
                    value={loginForm.values.email}
                    type="email" placeholder='Email' className='bg-gray-100 outline-none flex-1 text-sm' />
                </div>
                <div className='bg-gray-100 w-64 p-2 flex items-center space-x-2 mt-3'>
                  <MdLockOutline className='text-gray-400' />
                  <input
                    id='password'
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                    type="password" placeholder='Password' className='bg-gray-100 outline-none flex-1 text-sm' />
                </div>

                <div className='flex w-64 justify-between mt-5'>
                  <label className='flex itmes-center text-xs'><input type="checkbox" className='mr-1' />Remember me</label>
                  <a href="#" className='text-xs'>Forgot Password?</a>
                </div>
              </div>
              <button type='submit' className='border-2 border-gray-600 text-gray-600 rounded-full px-12 py-2 inline-block mt-10 font-semibold hover:bg-gray-600 hover:text-white'>Login</button>
            </form>
          </div>
        </div>


        <div className='w-2/5 bg-gray-600 py-36 px-12 text-white rounded-tr-2xl rounded-br-2xl'>
          <h2 className='text-3xl font-bold mb-2'>Hello, Friend!</h2>
          <div className='border-2 w-10 border-white rounded-lg inline-block mb-2'></div>
          <p className='text-white'>Fill up personal information and start your journey with us.</p>
          <a href="/signup"><button className='border-2 border-white rounded-full px-12 py-2 inline-block mt-10 font-semibold hover:bg-white hover:text-gray-600'>Sign Up</button></a>
        </div>
      </div>
    </div>
  )
}

export default Login