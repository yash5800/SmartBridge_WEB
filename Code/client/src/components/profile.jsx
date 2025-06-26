

const Profile = ({userId,userName,N,about,profile}) => {
  return (
    <div style={{paddingTop:70}}>
       <div className='flex flex-row justify-center pt-4 gap-20'>
          <img src={profile} alt="profile" className='size-40 rounded-full border-2 border-gray-900 shadow-2xl shadow-black' />
          <div className='flex justify-center items-start flex-col'>
             <p className='text-base font-mono text-gray-500'>ID:{userId}</p>
             <h3 className='text-gray-800 font-bold uppercase '>{userName}</h3>
             <textarea type='text' value={about} className='text-base text-slate-500 min-w-[200px] ' disabled style={{resize:'none'}}/>
          </div>
       </div>
       <div className='text-center w-full' style={{paddingTop:20}}>
          <p className='text-base text-gray-600'>Total Complains : {N}</p>
       </div>
    </div>
  )
}

export default Profile