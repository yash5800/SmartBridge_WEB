import React, { useContext, useRef, useState } from 'react'
import {ContextData} from '../../../context/contextData'
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8082');

const Chat = () => {
  const {messages,setMessages,complaint,agentId} = useContext(ContextData);
  const [activeChat,setActiveChat] = useState([]);
  const activeIndex = useRef(null);
  const complaintId = useRef();

  useEffect(()=>{
    
  socket.emit('join_room', complaintId.current); // join room

   socket.on('receive_message', (data) => {
     setActiveChat(prev => Array.isArray(prev) ? [...prev, data] : [data]);
   },[]);

  return () => {
    socket.off('receive_message');
  };

  },[])

    const sendMessage = () => {
    if (complaintId.current && !messages.trim()) return;

    const data = {
      compId:complaintId.current,
      from: agentId,
      messages:messages
    };

    socket.emit('send_message', data);
    setActiveChat(prev => [...prev, data]); // display own message
    setMessages('');
  };

  const fetchOldMessages = async (compId) => {
    const res = await fetch('http://localhost:8082/msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ compId:compId })
    });

    const result = await res.json()
    if (result.status) {
      setActiveChat(result.data);
    } else {
      console.log('No Past Data');
      setActiveChat([]); // clear if no data
    }
  };

  const handleActive = async (compId)=>{
      complaintId.current = compId
      socket.emit('join_room',compId)
      try{
         await fetchOldMessages(compId)
      }
      catch{
        console.log('fetch issues')
      }
  }

  return (
    <div className='flex justify-center h-screen items-center bg-red-300' >
      <div className='flex min-lg:flex-row max-sm:flex-col h-full w-full' style={{paddingTop:55}}>
         <div className='h-full flex flex-col max-sm:w-full min-lg:w-[350px] bg-gray-200 p-1 overflow-scroll gap-1 scroll-smooth' style={{scrollbarWidth:'none'}}>
            {complaint.map((item,index)=>(
              item.agentId === agentId &&
              <div onClick={()=>handleActive(item._id)} key={`ch-${index}`} className={`w-full rounded-xl ${activeIndex.current === index ? 'bg-black' :'bg-gray-500'} hover:bg-gray-700 text-center text-white font-semibold p-2 cursor-pointer`}>
                 {item.complaint}
              </div>
            ))}
         </div>
         <div className='h-full w-full bg-blue-100 flex flex-col px-2'>
           <div className='h-full w-full flex flex-col overflow-scroll gap-1 scroll-smooth py-2'
           style={{
            scrollbarWidth:'none'
           }}
           >
             {activeChat && 
              activeChat.map((chat,index)=>(
                chat.from == agentId ?
                <div key={`user-${index}`} className='max-w-[330px] self-end    rounded-lg bg-slate-700 text-white p-2'>
                 {chat.messages}
                </div>
                :
                 <div key={`agent-${index}`} className='max-w-[330px] self-start  rounded-lg bg-slate-700 text-white p-2'>
                  {chat.messages}
                 </div>
              ))
             }
            
             
           </div>
           
           <div className='self-center flex flex-row bg-slate-700 rounded-xl w-[400px] p-2 bottom-0 gap-2 justify-center items-center'>
             <input 
             type="text" 
             className=' bg-white rounded-lg px-3 py-2 w-full outline-none'
             value={messages}
             onChange={(event)=>setMessages(event.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
             />
             <div className='rounded-xl bg-blue-400 text-lg font-medium p-1 cursor-pointer'
              onClick={sendMessage}
             >
               Send
             </div>
           </div>
         </div>
      </div>
    </div>
  )
}

export default Chat