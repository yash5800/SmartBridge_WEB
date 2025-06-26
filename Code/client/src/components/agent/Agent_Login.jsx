import React, { useContext } from 'react'
import LCard from '../LCard'
import {ContextData} from '../../context/contextData';

const AgentLogin = ({setPage}) => {
  const {setTab,setAgentName,setAgentId,setLog} = useContext(ContextData);
  const handleSubmit =async(user,pwd)=>{
      const res = await fetch('http://localhost:8082/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({type:'agent',user:user,pwd:pwd})
      })

      const result = await res.json();
      console.log(result)
      if(result.status){
         setPage('')
         setLog(true)
         setTab('agent')
         setAgentId(result.id)
         setAgentName(user)
      }
      else{
         alert('Wrong Details')
      }

  }
  return (
      <div className='h-screen w-screen flex justify-center items-center bg-blue-100'>
        <LCard head={'Agent Login'} name={'agentlogin'} sign={'agentsignup'} setPage={setPage} handleSubmit={handleSubmit} />
    </div>
  )
}

export default AgentLogin