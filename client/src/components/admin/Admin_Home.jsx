import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Dash from './components/Dash';
import Button from '../Button';
import { useCallback } from 'react';
import { AdminData, ContextData } from '../../context/contextData';
import Assign from './components/Assign';
import User from './components/users';
import Agent from './components/agent';

 

const AdminHome = () => {
  const [nav,setNav] = useState('dash')
  const [cat,setCat] = useState('pending');
  const [catData,setCatData]= useState([])
  const [agents,setAgents] = useState([]);
  const [c_agents,setCAgents] = useState([]);
  const [users,setUsers] = useState([]);
  const [dataOb,setDataOb] = useState([]);
  const { complaint,setComplaint } = useContext(ContextData);

  useEffect(()=>{
    const find = async()=>{
       const res = await fetch('http://localhost:8082/find',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({type:'agent',find:{}})
       })

           const result = await res.json();
       if (result.status) {
         setAgents(result.data);
       } else {
         console.log('Agents Not Found');
       }
       }
      find()

    const get = async()=>{
       const res = await fetch('http://localhost:8082/complaints',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({type:'',user:'',userId:''})
       })

           const result = await res.json();
       if (result.status) {
         setComplaint([...result.data]);
       } else {
         console.log('Comaplaints Not Found');
       }
       }
      get()

  },[setComplaint])

  useEffect(() => {
  const dicOb = {};
  const tempUsers = new Set();
  const tempAgents = new Set();

  complaint.forEach((item) => {
    if (!dicOb[item.agentId]) {
      dicOb[item.agentId] = {
        name: item.agent,
        pending: 0,
        completed: 0
      };
    }
    if (!dicOb[item.userId]) {
      dicOb[item.userId] = {
        name: item.user,
        pending: 0,
        completed: 0
      };
    }

    if (item.status === 'pending') {
      dicOb[item.agentId].pending++;
      dicOb[item.userId].pending++;
    } else {
      dicOb[item.agentId].completed++;
      dicOb[item.userId].completed++;
    }

    tempAgents.add(item.agentId);
    tempUsers.add(item.userId);
  });

  setCAgents(Array.from(tempAgents));
  setUsers(Array.from(tempUsers));
  setDataOb(dicOb);
}, [complaint]); // ✅ Only runs when complaints change


  const updateCatData = useCallback((complaints)=>{
      const newData = complaints.filter((item)=>item.status === cat);

      console.log(newData)

      setCatData(newData)
  },[setCatData,cat])
  
  return (
     <>
      <div className="flex flex-row justify-around items-center p-2 absolute w-full bg-gray-500" >
           <div className='text-2xl font-bold'>{`Welcome admin!`}</div>
          <div className="flex flex-row justify-start items-center">
           <Button title={'Dashboard'} name={"dash"} setNav={setNav} />
           <Button title={'Assign'} name={"assign"} setNav={setNav} />
           <Button title={'Users'} name={"users"} setNav={setNav} />
           <Button title={'Agents'} name={"agents"} setNav={setNav} />
          </div>
      </div>

      <AdminData.Provider value={{cat,catData,setCat,setCatData,updateCatData,agents}} >
        {nav === 'dash' && <Dash />}
        {nav === 'assign' && <Assign/>}
        {nav === 'users' && <User users={users} dataOb={dataOb} />}
        {nav === 'agents' && <Agent agents={c_agents} dataOb={dataOb} />}
      </AdminData.Provider>
     </>
  )
}

export default AdminHome