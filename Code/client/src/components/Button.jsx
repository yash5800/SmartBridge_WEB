import React from 'react'

const Button = ({ title ,name ,setNav }) => {
  return (
    <div className='rounded-xl overflow-hidden'>
      <button
      onClick={()=>setNav(name)}
      className='p-2 hover:bg-blue-400  text-lg font-semibold text-white '
     >
      {title}
     </button>
   </div>
  )
}

export default Button