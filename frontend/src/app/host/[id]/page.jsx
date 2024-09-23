'use client';
import app_config from '@/config';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'react-qr-code';
import ReactWordcloud from 'react-wordcloud';
import { io } from 'socket.io-client';

const words = [
    {
        text: 'told',
        value: 64,
    },
    {
        text: 'mistake',
        value: 11,
    },
    {
        text: 'thought',
        value: 16,
    },
    {
        text: 'bad',
        value: 17,
    },
    {
        text: 'correct',
        value: 10,
    },
    {
        text: 'day',
        value: 54,
    },
    {
        text: 'prescription',
        value: 12,
    },


]

const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [40, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 2,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 300
};

const host = () => {

    const [socket, setSocket] = useState(io(app_config.api_url, { autoConnect: false }));
    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [submittedPolls, setSubmittedPolls] = useState([]);

    const inputRef = useRef(null);

    const getRoomData = async () => {
        const res = await axios.get(app_config.api_url + '/room/getbyid/' + id);
        console.log(res.data);

        setRoomData(res.data);
        socket.emit('join-room', res.data.title)
    }

    socket.on('rec-poll', (poll) => {
        setSubmittedPolls([...submittedPolls, poll]);
        console.log(poll);
        // formatWordData();
    })

    useEffect(() => {
        socket.connect();
        getRoomData();
    }, [])

    const setRoomQuestion = () => {
        socket.emit('set-question', { room: roomData.title, question: inputRef.current.value });
    }

    const formatWordData = () => {
        const words = {};
        submittedPolls.forEach( poll => {
            if(poll in words){
                words[poll]+=1;
            }else{
                words[poll]=1;
            }
        } )

        // console.log(words);
        return Object.keys(words).map( word => ({text : word , value : words[word]}) )
    }

    return (
        <div className='flex bg-gradient-to-r from-blue-200 to-red-200' >
        <div className=''>
  
            <QRCode value={'http://192.168.1.43:3000/poll/'+id} className='ml-20 mt-20 mr-20 mt-10' />
            <p className='text-xl font-bold ml-10 mt-10 underline underline-offset-1 text-blue-500 mr-10 italic px-10 py-5'>*Scan this QR Code to Answer The Question</p>
            </div>

 
            <div className='mx-auto shadow-md shadow-white mb-10 mt-10 w-full mr-20' > 
                <div className='border bg-blue-500 shadow rounded-md'>
                    <div className='p-4 border-b-2'>
                        <input
                            ref={inputRef}
                            placeholder='Type Your Question '
                            type="text"
                            className='w-full p-3 bg-blue-100 rounded-xl outline-none ' />

                        <button onClick={setRoomQuestion} className='border-none rounded-full px-3 py-2 bg-red-500 text-white mt-5 py-10 px-10'>Submit</button>

                    </div>
                    </div>

                    <div className='p-6 bg-blue-100'>
                        {submittedPolls}
                        <ReactWordcloud options={options} words={formatWordData()} />
                    </div>

                </div>

            </div>
            
        
        
    )
}

export default host;