import React, { useRef } from 'react'

const RCard = ({head,name,handleSubmit}) => {
    const value = useRef('');
    const pwd = useRef('');
    const email = useRef('');
  return (
    <div className='rounded-lg bg-slate-800 flex flex-col justify-start p-4 items-center gap-4'>
           <h1 className='text-white font-bold'>{head}</h1>
           <form className='flex justify-center items-center flex-col gap-2' action="#" onSubmit={()=>handleSubmit(value.current.value,pwd.current.value,email.current.value)} >
           <div className='flex flex-col gap-2'>
            <input 
             type='text' 
             ref={value}
             placeholder='username'
             className='p-1 border-2 border-red-50 rounded-lg text-black bg-white' required />
            <input 
             type='email' 
             ref={email}
             placeholder='email'
             className='p-1 border-2 border-red-50 rounded-lg text-black bg-white' required />
            <input 
             type='password' 
             ref={pwd}
             placeholder='password'
             className='p-1 border-2 border-red-50 rounded-lg text-black bg-white' required />
           </div>
          <div className='overflow-hidden rounded-xl'>
           <button
            className='text-base text-black bg-white font-semibold px-3 py-2 hover:bg-black hover:text-white'
            >
              Submit
           </button>
          </div>
          </form>
      </div>
  )
}

export default RCard