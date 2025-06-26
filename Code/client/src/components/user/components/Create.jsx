import React, { useContext, useRef } from 'react'
import {ContextData} from '../../../context/contextData'

const Create = () => {
  const {userId,userName} = useContext(ContextData);
  const user_email = useRef()
  const user_description = useRef()

  const handleCreate =async()=>{
      if (user_email == '' && user_description =='') return
      console.log('clicked')
      const res = await fetch('http://localhost:8082/create',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({user:userName,userId:userId,email:user_email.current.value,complaint:user_description.current.value})
      })

      const result = await res.json();
      console.log(result)
      if(result.status){
         user_email.current.value =''
         user_description.current.value=''
         alert('Complaint Created')
      }
      else{
         alert('Fail to create')
      }

  }

  return (
    <div className='flex h-screen flex-col justify-center items-center ' style={{paddingTop:20}}>
      <div className='text-xl font-bold text-gray-700'>
         Raise a complaint
      </div>
      <div className='bg-gray-800 flex flex-col justify-start items-center p-3 gap-2 rounded-xl '>
         <label className='text-white'>Your email:</label>
         <input ref={user_email} type="email" className='px-3 py-2 bg-white rounded-lg' />
         <label className='text-white'>Description:</label>
         <textarea ref={user_description}  type="text" className='px-3 py-2 bg-white rounded-lg  min-h-[100px] max-h-[200px]' />
         <div className='p-2 cursor-pointer bg-white text-gray-800 font-bold rounded-xl' onClick={()=>handleCreate()}>Send</div>
      </div>
    </div>
  )
}

export default Create