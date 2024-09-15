'use client';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const poll = () => {


 const [socket, setSocket] = useState(io('http://localhost:5000', {autoConnect : false}));

 const [message ,setMessage] = useState("")

 const handleSubmit = (e) => {
  e.preventDefault();
  socket.emit("message", message);
  setMessage("");

 };

    useEffect(() => {
      socket.connect();
      console.log("connected",socket.id);

      socket.on("welcome",(s)=> {
        console.log(s);
        
      });

      socket.on("recieve-message",(data) => {
        console.log(data);
        socket.emit("recieve-message" ,data)
        
      })

      return() =>{
        socket.disconnect();
      };

  }, []);

  
    
  return (
  <form  onSubmit={handleSubmit}>

<h1 className='text-5xl font-bold text-red-500 mt-10  '>Vote Here</h1>
       <input value = {message} onChange={e=>setMessage(e.target.value)} className="mt-10 ml-4  border-2 w-1/2 px-5 py-10 shadow-md " type="text" placeholder='Send a Message' />

       <br />
       <button type="submit"className='text-white ml-4 bg-blue-500 rounded-md mt-5 mb-5 p  px-5 py-2 border-2 shadow-md'> Send </button>

{
  socket.id
}
       


  </form>

  )


    

    
   

  
  
      
    
}

export default poll ;