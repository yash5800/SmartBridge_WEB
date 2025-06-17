import { createContext } from "react";

 const ContextData = createContext({
  tab:'',
  setTab:()=>{},
  isLog:false,
  setLog:()=>{},
  userId:'',
  userName:'',
  agentId:'',
  agentName:'',
  complaintId:'',
  setComplaintId:()=>{},
  complaint:[],
  setComplaint:()=>{},
  messages:[],
  setMessages:()=>{}
})

 const AdminData = createContext({
  cat:'',
  setCat:()=>{},
  catData:[],
  setCatData:()=>{}
 })

export {
  ContextData,
  AdminData
}