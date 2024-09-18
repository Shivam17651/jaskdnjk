'use client'
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name:Yup.string()
  .min(2,'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),

  email: Yup.string().email('Invalid email').required('Required'),
  password : Yup.string().required('Password is Required')
  .matches(/[a-z]/ , 'Lowercase Letter is Required')
  .matches(/['A-Z']/, 'Uppercase Letter is Required') 
  .matches(/[''0-9]/, 'Number is Required')
  .matches(/\W/, 'Special Character is Required'),  
  confirmPassword : Yup.string().required('Comfirmation is Required')
  .oneOf([Yup.ref('password'), null], 'Password must match'),
})

const signup = () => {

  const signupform = useFormik ({
    initialValues:{
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
    },

    onSubmit : (values , {resetform,setSubmitting}) => {
        
      setTimeout(() => {
     console.log(values);
      resetForm();
     setSubmitting(false)
   }, 3000);
   
  
  },
    validationSchema: SignupSchema 
  
  });

  return (
    <div className = 'flex justify-center items-center h-screen'>
    <div className='w-full max-w-md mx:auto'>
      <div className='border-2 shadow p-8 rounded-lg'>
        <h1 className='font-bold text-xl my-6 text-gray-600 text-center'>Sign Up</h1>
        <form onSubmit={signupform.handleSubmit}>
         <label htmlFor="name">FULL NAME</label>
         <span className='text-sm ml-4 text-red-600'>{signupform.touched.name && signupform.errors.name}</span>

         <input id='name' onChange={signupform.handleChange} value={signupform.values.name} 
         type='text' className={'border rounded w-full px-3 py-3 mb-4 ' +
          ((signupform.touched.name && signupform.errors.name) ? 'border-red-400': '' )}/>


         <label htmlFor="email">EMAIL </label>
         <span className='text-sm ml-4 text-red-500'>{signupform.touched.email && signupform.errors.email}</span>
         <input id='email' onChange={signupform.handleChange} value={signupform.values.email} type='email' className={'border rounded w-full px-3 py-3 mb-4' + 
          ((signupform.touched.name && signupform.errors.email) ? 'border-red-400': '' )} />


         <label htmlFor="password">PASSWORD </label>
         <span className='text-sm ml-4 text-red-600'>{signupform.touched.password && signupform.errors.password}</span>
         <input id='password' onChange={signupform.handleChange} value={signupform.values.password}  type='password' className={'border rounded w-full px-3 py-3 mb-4' + 
          ((signupform.touched.password && signupform.errors.password) ? 'border-red-400': '' )}/>


         <label htmlFor="password">CONFIRM PASSWORD </label>
         <span className='text-sm ml-4 text-red-600'>{signupform.touched.password && signupform.errors.password}</span>

         <input id='password' onChange={signupform.handleChange} value={signupform.values.password}  type='password' className={'border rounded w-full px-3 py-3 mb-4' +
          ((signupform.touched.password && signupform.errors.password) ? 'border-red-400': '' )}/>

         <button type='submit' className='flex justify-center items-center border bg-blue-600 text-white mt-8 px-3 py-2 rounded w-full'>
         <span>{signupform.isSubmitting ? 'Please Wait' : 'Submit'}</span>
         </button>
        </form>

      </div>
    </div>
    </div>
  )
}

export default signup;