import React, { useContext } from 'react'
import LCard from '../LCard'
import { ContextData } from '../../context/contextData';

const UserLogin = ({setPage}) => {
  const {setTab,setuserName,setUserId,setLog} = useContext(ContextData);
  const handleSubmit =async(user,pwd)=>{
      const res = await fetch('http://localhost:8082/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({type:'users',user:user,pwd:pwd})
      })

      const result = await res.json();
      console.log(result)
      if(result.status){
         setPage('')
         setLog(true)
         setTab('user')
         setUserId(result.id)
         setuserName(user)
      }
      else{
         alert('Wrong Details')
      }

  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-blue-100'>
        <LCard head={'User Login'} name={'userlogin'} sign={'usersignup'} setPage={setPage} handleSubmit={handleSubmit} />
    </div>
  )
}

export default UserLogin