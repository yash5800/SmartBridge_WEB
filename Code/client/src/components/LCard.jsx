import React, { useRef } from 'react'

const LCard = ({head,name,sign,setPage,handleSubmit}) => {
  const value = useRef('');
  const pwd = useRef('');
  const next = name ==='userlogin' ? 'agentlogin' : 'userlogin'

  return (
      <div className='rounded-lg bg-slate-800 flex flex-col justify-start p-4 items-center gap-4'>
           <h1 className='text-white font-bold'>{head}</h1>
           <form className='flex justify-center items-center flex-col gap-2' action="#" onSubmit={()=>handleSubmit(value.current.value,pwd.current.value)} >
           <div className='flex flex-col gap-2'>
            <input 
             type='text' 
             ref={value}
             placeholder='username'
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
          {sign && 
             <div>
              <div className='flex flex-row gap-2 justify-center items-center'>
                <p className='text-base text-white'>
                Don't you have account? </p>
                <p className='text-base text-blue-400 hover:cursor-pointer' onClick={()=>setPage(sign)}>SignUp</p>
              </div>
              <div className='flex flex-row gap-2 justify-center items-center'>
                <p className='text-base text-white' >
                Are you {name ==='userlogin' ? 'Agent' : 'User'} ? </p>
                <p className='text-base text-blue-400 hover:cursor-pointer' onClick={()=>setPage(next)}>Login</p>
              </div>
              <div className='flex flex-row gap-2 justify-center items-center'>
                <p className='text-base text-white'>
                Are you Admin ? </p>
                <p className='text-base hover:cursor-pointer text-blue-400' onClick={()=>setPage('adminlogin')}>Login</p>
              </div>
             </div>
          }
      </div>
  )
}

export default LCard