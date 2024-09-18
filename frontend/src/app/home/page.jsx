import React from 'react'



const home = () => {
  return (

    <section>
    <div className='justify-center text-center bg-gradient-to-r from-blue-200 to-red-200 mx-auto'>

      <div className='mb-10 '>

<h1 className='text-5xl font-bold text-red-500 mt-10  '>Vote Here</h1>
       <input className="mt-10 ml-4  border-2 w-1/2 px-5 py-10 shadow-md " type="text" placeholder='Send a Message' />

       <br />
       <button className='text-white ml-4 bg-blue-500 rounded-md mt-5 mb-5 p  px-5 py-2 border-2 shadow-md'> Send </button>

       </div>

       <div>
        <img className = " flex justify-center ml-20 mb-20 mt-20" src="https://www.repustate.com/blog/images/mac-beauty-word-cloud.jpg" alt="" />
       </div>

    </div>

    </section>
  )
}

export default home;