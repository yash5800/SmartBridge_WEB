import React, { useContext, useState } from 'react'
import Dash from './components/Dash'
import Create from './components/Create'
import Button from '../Button'
import Chat from './components/Chat'
import {ContextData} from '../../context/contextData'
import Profile from '../profile'
import profile from '../../assets/profile.png'
const UserHome = () => {
  const {userName,userId,complaint} = useContext(ContextData)
  const [nav,setNav] = useState('dash')
  
  return (
     <>
      <div className="flex flex-row justify-around items-center p-2 absolute w-full bg-gray-500" >
           <div className='text-2xl font-bold'>{`Welcome ${userName}!`}</div>
          <div className="flex flex-row justify-start items-center">
           <Button title={'Dashboard'} name={"dash"} setNav={setNav} />
           <Button title={'Chat'} name={"chat"} setNav={setNav} />
           <Button title={'Create'} name={"create"} setNav={setNav} />
           <Button title={'Profile'} name={"profile"} setNav={setNav} />
          </div>
      </div>
      {nav === "dash" && <Dash />}
      {nav === "chat" && <Chat />}
      {nav === "create" && <Create />}
      {nav === "profile" && <Profile userId={userId} userName={userName} about={'I am the king of ther pirates'} N={complaint.length} profile={profile} />}
     </>
  )
}

export default UserHome