import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Home = () => {

  const{currentUser} = useSelector((state)=>state.user)

  return (
    <div className="flex flex-row  mt-[70px] justify-between">
      <div className="md:mt-6 w-1/2 px-[40px] md:px-[153px]">
        <h1 className="md:text-[40px] text-[30px] text-blue-800 pt-[30px] font-semibold">Let's map the tasks</h1>
        <p className=" text-xl mt-6">Focus, from work to play with the best to <br /> do list app.</p>
        {
          currentUser? <button className="py-2 bg-blue-400 mt-7 font-bold text-white hover:bg-blue-600 rounded-[10px] px-4 border">Review your tasks</button> : <button className="py-2 bg-blue-400 mt-7 font-bold text-white hover:bg-blue-600 rounded-[10px] px-4 border"><Link to='/signin'>Login to coninue</Link></button>
        }
      </div>
      <div className="w-1/2 flex justify-center items-center object-contain">
         <img width='750px' src="https://www.cflowapps.com/wp-content/uploads/2018/07/task-management-process.png" alt="heroImg" />
      </div>
    </div>
  )
}

export default Home