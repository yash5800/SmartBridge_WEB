import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AdminData } from '../../../context/contextData';

const Dash = () => {
  const {cat,catData,setCat,setCatData,updateCatData} = useContext(AdminData)
  const [complaints,setComplaints] = useState([]);

  const [copied, setCopied] = useState(false);

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
      body: JSON.stringify({ type:'admin', user: '', userId: '' })
    });

    const result = await res.json();
    if (result.status) {
      setComplaints(result.data);

      const filtered = result.data.filter((item) => item.status === cat);
      setCatData(filtered);
    } else {
      console.log('Not Found');
    }
  };

  fetchData();
}, [setComplaints,setCatData,cat]); 



  const handleSelect = (event)=>{
       setCat(event.target.value);
       updateCatData(complaints);
  }

  return (
    <div className='w-full' style={{paddingTop:60}}>
      <div className="w-full text-lg font-semibold text-gray-600 p-3">
         Category :
         <select value={cat} onChange={handleSelect} >
           <option value={"pending"}>pending</option>
           <option value={"completed"}>completed</option>
         </select>
      </div>
        {
      catData.length > 0?
     <div className='flex justify-center items-center px-3'>
         <div className='flex flex-wrap flex-row w-full p-3 gap-2 justify-start items-center'>
           {
            catData.map((item,index)=>(
            item.status === cat ?             
            <div key={`c-${index}`} className='rounded-xl flex flex-col bg-gray-500 p-2 w-[250px] font-medium'>
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
                <div className='flex flex-row gap-1 text-base text-blue-300'>
                  <p>Status :</p>
                  <p className={item.status === 'pending'?'text-amber-200':'text-green-300'} >{item.status}</p>
                </div>
            </div>:null
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