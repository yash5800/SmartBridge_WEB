import React, { useContext } from 'react'
import LCard from '../LCard'
import {ContextData} from '../../context/contextData';

const AdminLogin = ({setPage}) => {
  const {setTab,setLog} = useContext(ContextData); 
  const handleSubmit =async(user,pwd)=>{
      console.log('click')
      const res = await fetch('http://localhost:8082/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({type:'admin',user:user,pwd:pwd})
      })

      const result = await res.json();
      console.log(result)
      if(result.status){
         setPage('')
         setLog(true)
         setTab('admin')
      }
      else{
         alert('Wrong Details')
      }

  }
  return (
      <div className='h-screen w-screen flex justify-center items-center bg-blue-100'>
        <LCard head={'Admin Login'} name={'adminlogin'}  setPage={setPage} handleSubmit={handleSubmit} />
    </div>  )
}

export default AdminLogin