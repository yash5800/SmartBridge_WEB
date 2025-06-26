import React from 'react'
import RCard from '../RCard'

const UserSignup = ({setPage}) => {
  const handleSubmit =async(user,pwd,email)=>{
      const res = await fetch('http://localhost:8082/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({type:'users',user:user,pwd:pwd,email:email})
      })

      const result = await res.json();
      console.log(result)
      if(result.type === 'insert',result.status){
          alert('inserted')
          setPage('userlogin')
      }
      else if(result.type === 'already'){
         alert('User name already Exists')
      }
      else{
        alert('Somthing wrong!')
      }
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-blue-100'>
        <RCard head={'User SignUp'} name={'userlogin'} setPage={setPage} handleSubmit={handleSubmit} />
    </div>
  )
}

export default UserSignup