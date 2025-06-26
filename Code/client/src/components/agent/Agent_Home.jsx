import React from 'react'
import {ContextData} from '../../context/contextData'
import { useContext } from 'react'
import { useState } from 'react'
import Button from '../Button'
import Dash from './components/Dash'
import Profile from '../profile'
import profile from '../../assets/agent.png'
import Chat from './components/Chat'



const AgentHome = () => {
  const {agentName,agentId,complaint} = useContext(ContextData)
  const [nav,setNav] = useState('dash')

  
  return (
    <>
      <div className="flex flex-row justify-around absolute w-full items-center p-2  bg-gray-500" >
           <div className='text-2xl font-bold'>{`Welcome ${agentName}!`}</div>
          <div className="flex flex-row justify-start items-center">
           <Button title={'Dashboard'} name={"dash"} setNav={setNav} />
           <Button title={'Chat'} name={"chat"} setNav={setNav} />
           <Button title={'Profile'} name={"profile"} setNav={setNav} />
          </div>
      </div>
      {nav === 'dash' && <Dash />}
      {nav === 'chat' && <Chat/>}
      {nav ==='profile' && <Profile userId={agentId} userName={agentName} N={complaint.length} about={'I am helpful agent'} profile={profile} />}
    
     </>
  )
}

export default AgentHome