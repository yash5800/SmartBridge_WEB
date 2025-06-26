import React from 'react'

const Agent = ({agents,dataOb}) => {
  console.log(agents)
  // console.log(dataOb)
  return (
    <div className='w-full px-5' style={{paddingTop:70}}>
          <div className='flex flex-wrap justify-center gap-2'>
            {
              agents.map((item,index)=>(
                
               <div key={`u-${index}`} className='min-w-[200px] bg-slate-700 rounded-lg flex justify-center flex-col items-center'>
                  <div className='text-white font-medium text-lg'>
                    <p>{dataOb[item].name}</p>
                  </div>
                  <div className='flex flex-row justify-center items-center font-mono text-sm gap-3'>
                     <p className='text-yellow-300'>Pending :{dataOb[item].pending}</p>
                     <p className='text-green-500'>Completed :{dataOb[item].completed}</p>
                  </div>
               </div>
              ))
            }
          </div>
    </div>
  )
}

export default Agent