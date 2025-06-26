import React, { useContext, useEffect } from 'react'
import {ContextData} from '../../../context/contextData';

const Dash = () => {
  const {complaint,setComplaint,userId,userName} = useContext(ContextData);

  useEffect(() => {
  const fetchData = async () => {
    const res = await fetch('http://localhost:8082/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({type:'user', user: userName, userId: userId })
    });

    const result = await res.json();
    if (result.status) {
      setComplaint(result.data);
    } else {
      console.log('Not Found');
    }
  };

  fetchData();
}, [userId, userName,setComplaint]); 

  return (
   <div className="flex flex-col text-3xl font-bold">
     <div className='w-full flex justify-start items-center px-2 text-xl text-gray-500' style={{marginTop:70}}>
       <p>Complaints:</p>
     </div>
     {
      complaint.length > 0?
     <div className='flex justify-center items-center px-3'>
         <div className='flex flex-wrap flex-row w-full p-3 gap-2 justify-start items-center'>
           {
            complaint.map((item,index)=>(               
            <div key={`c-${index}`} className='rounded-xl flex flex-col bg-gray-500 p-2 w-[250px]'>
                <div className='text-white text-lg'>
                   <p>{item.complaint}</p>
                </div>
                <div className='flex flex-row gap-1 text-base text-blue-300'>
                  <p>Agent :</p>
                  <p className='text-white' >{item.agent !== '' ? item.agent : 'Not Assigned'}</p>
                </div>
                <div className='flex flex-row gap-1 text-base text-blue-300'>
                  <p>Status :</p>
                  <p className={item.status === 'pending'?'text-amber-200':'text-green-300'} >{item.status}</p>
                </div>
            </div>
            ))
           }
         </div>
     </div>
     :
      <div className='text-xl font-bold text-emerald-800'>Looks Like No Complaints Filed.....</div>
     }
   </div>

  )
}

export default Dash