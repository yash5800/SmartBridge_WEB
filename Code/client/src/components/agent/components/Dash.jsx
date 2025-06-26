import React from 'react'
import { useContext } from 'react'
import {ContextData} from '../../../context/contextData'
import { useEffect } from 'react'
import { useState } from 'react'

const Dash = () => {
  const {complaint,agentId,agentName,setComplaint} = useContext(ContextData) 
  const [copied, setCopied] = useState(false);
  const [refresh, setRefresh] = useState(false);


  const handleCopy = async (id) => {
    await navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  };
  

    useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8082/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({type:'complaint', user: agentName, userId: agentId })
      });
  
      const result = await res.json();
      if (result.status) {
        setComplaint(result.data);
      } else {
        console.log('Not Found');
      }
    };
  
    fetchData();
  }, [agentId,agentName,setComplaint,refresh]); 

  const handleChange = async (val,id)=>{
    const res = await fetch('http://localhost:8082/update', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({type:'complaint',find:{"_id":id},update:{status:val}})
           })

          const result = await res.json();
          console.log(result)
           if (result.status && result.payload === "new") {
                alert('Updated');
                setRefresh(prev => !prev); // Triggers re-render
              }
            else {
             console.log('Agents Not Found');
           }
  }

  return (
    <div className='w-full' style={{paddingTop:60}}>
      <div className="w-full text-lg font-semibold text-gray-600 p-3">
         Assigned Complaints:
      </div>
           {
      complaint.length > 0?
     <div className='flex justify-center items-center px-3'>
         <div className='flex flex-wrap flex-row w-full p-3 gap-2 justify-start items-center font-medium'>
           {
            complaint.map((item,index)=>(  
            item.agentId === agentId &&
            <div key={`c-${index}`} className='rounded-xl flex flex-col bg-gray-500 p-2 w-[250px]'>
                <div className='text-white text-lg'>
                   <p>{item.complaint}</p>
                </div>
                <div className='text-base font-bold text-white flex flex-row flex-wrap' title="Click to copy ID">
                  <p>Complaint ID : </p>
                  <p onClick={()=>handleCopy(item._id)} className="text-blue-300 cursor-pointer">
                    {item._id} {copied && <span className="text-green-400">✔Copied</span>}
                  </p>
                </div>
                <div className='flex flex-row gap-1 text-base text-blue-300'>
                  <p>User :</p>
                  <p className='text-white' >{item.user}</p>
                </div>
                <div className='flex flex-row gap-1 text-base text-blue-300'>
                  <p>Agent :</p>
                  <p className='text-white' >{item.agent !== '' ? item.agent : 'Not Assigned'}</p>
                </div>
                <div className='flex flex-row gap-1 text-base text-blue-300 items-center'>
                  <p className='mt-3'>Status :</p>
                  <select value={item.status} onChange={(event)=>handleChange(event.target.value,item._id)} className={item.status === 'pending'?'text-amber-200':'text-green-300'}>
                     <option value='pending'>pending</option>
                     <option value='completed'>completed</option>
                  </select>
                </div>
            </div>
            ))
           }
         </div>
     </div>
     :
      <div className='text-xl font-bold text-emerald-800'>Looks Like No Complains Assigned.....</div>
     }
    </div>
  )
}

export default Dash