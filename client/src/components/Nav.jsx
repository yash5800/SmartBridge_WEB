import Button from './Button'

const Nav = ({setTab}) => {
  return (
      <div className="flex flex-row justify-between items-center p-3 bg-gray-500" >
          <div className='text-lg font-bold text-yellow-400'
           onClick={()=>{}}
          >
             <h1>Complaints</h1>
          </div>
          <div className="flex flex-row justify-start items-center">
           <Button title={'Dashboard'} name={"dash"} setTab={setTab} />
           <Button title={'Complaints'} name={"comp"} setTab={setTab} />
           <Button title={'Chat'} name={"chat"} setTab={setTab} />
          </div>
      </div>
  )
}

export default Nav