import React from 'react'
import { useContext } from 'react'
import { AdminData } from '../../../context/contextData'
import { useRef } from 'react';
import { useState } from 'react';

const Assign = () => {
  const {agents} = useContext(AdminData);
  const [seleted_agent,setAgent] = useState({
       agent:agents[0].user,
       agentId:agents[0]._id
  });

  console.log({
       agent:agents[0].user,
       agentId:agents[0]._id
  })

  const compId = useRef(); 

  const handleChange =(index)=>{
     console.log(index)

     const obj = {
       agent:agents[index].user,
       agentId:agents[index]._id
     }
     setAgent(obj)
  }
 
  const handleSubmit =async ()=>{
      const res = await fetch('http://localhost:8082/update',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({type:'complaint',find:{"_id":compId.current.value},update:seleted_agent})
           })

          const result = await res.json();
          console.log(result)
           if (result.status) {
             if(result.payload === "new"){
                alert('Updated')
             }
             else if(result.payload == "not"){
              alert('Invalid ComplainID')
             }
           } else {
             console.log('Agents Not Found');
           }
           
        }
  
  return (
    <div className='w-full h-screen flex justify-center items-center' style={{paddingTop:60}}>
          <div className='bg-gray-500 text-white p-3 justify-center flex flex-col rounded-xl'>
              <h2>Assign Agents to Complaint</h2>
              <form action="#" onSubmit={()=>handleSubmit()} className='flex flex-col justify-center items-center gap-1' >
                   <label className='font-bold'>Complaint ID:</label>
                   <input type="text" ref={compId} className='p-1 rounded-lg bg-white text-black' placeholder='Enter ID' required />
                   <select onChange={(event)=>handleChange(event.target.value) } className='bg-white text-black m-2 p-1' required>
                      <option value={''} disabled>--select agent--</option>
                      {
                        agents.map((item,index)=>(
                          <option key={`op-${index}`} className='p-1' value={index} >{item.user}</option>
                        ))
                      }
                   </select>
                   <button className='py-2 px-3 bg-white text-gray-800 rounded' >Assign</button>
              </form>
          </div>
    </div>
  )
}

export default Assign