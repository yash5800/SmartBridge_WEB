import { useState } from "react";
import UserLogin from './components/user/User_Login'
import UserSignup from './components/user/User_Signup'
import AgentLogin from './components/agent/Agent_Login'
import AgentSignup from './components/agent/Agent_Signup'
import AdminLogin from './components/admin/Admin_Login'
import {ContextData}  from "./context/contextData";
import UserHome from "./components/user/User_Home";
import AgentHome from "./components/agent/Agent_Home";
import AdminHome from "./components/admin/Admin_Home";

// const complaint = [
//   {
//     complaint:'My Display is not working',
//     agent:'jhon',
//     user:'ramesh',
//     contact:'admin@gmail.com',
//     agentid:'123',
//     userid:'123',
//     status:'pending'
//   },
//   {
//     complaint:'My Phone is not working?',
//     agent:'jhon',
//     user:'ramesh',
//     agentid:'123',
//     userid:'123',
//     status:'complete'
//   },
//   {
//     complaint:'My Phone?',
//     agent:'jhon',
//     user:'ramesh',
//     agentid:'123',
//     userid:'123',
//     status:'pending'
//   }
// ]

// const messages = [
//   {
//     complaintid:'234',
//     complaint:'My phone is not working?',
//     userid:'',
//     agentid:'',
//     chat:[
//       {
//         type:'user',
//         payload:'hi'
//       },
//       {
//         type:'agent',
//         payload:'Hi,i am working on you complaint'
//       }
//     ]
//   },
//   {
//     complaintid:'234',
//     complaint:'My disply is not working?',
//     userid:'',
//     agent:'',
//     chat:[
//       {
//         type:'user',
//         payload:'hi'
//       },
//       {
//         type:'user',
//         payload:'hi'
//       },
//       {
//         type:'agent',
//         payload:'Hi,i am working on your complaint'
//       }
//     ]
//   }
// ]

function App() {
  const [page,setPage] = useState('userlogin')
  const [tab,setTab] = useState('')
  const [userId,setUserId] = useState('')
  const [userName,setuserName] = useState('')
  const [agentId,setAgentId] = useState('')
  const [agentName,setAgentName] = useState('')
  const [isLog,setLog] = useState(false)
  const [messages,setMessages] = useState([])
  const [complaint,setComplaint] = useState([])
  
  return (
      <ContextData.Provider value={{tab,setTab,isLog,setLog,complaint,setComplaint,messages,setMessages,userId,setUserId,userName,setuserName,setAgentId,setAgentName,agentId,agentName}}>
        {!isLog && page === 'userlogin' && <UserLogin setPage={setPage} />}
        {!isLog && page === 'usersignup' && <UserSignup setPage={setPage} />}
        {!isLog && page === 'agentlogin' && <AgentLogin setPage={setPage} />}
        {!isLog && page === 'agentsignup' && <AgentSignup setPage={setPage} />}
        {!isLog && page === 'adminlogin' && <AdminLogin setPage={setPage} />}
        {isLog && tab === 'user' && <UserHome />}
        {isLog && tab === 'agent' && <AgentHome />}
        {isLog && tab === 'admin' && <AdminHome />}
      </ContextData.Provider>
  );
}

export default App;
