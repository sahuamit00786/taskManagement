import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import { MdOutlineDoneOutline } from "react-icons/md";
const Task = () => {

    const[myTasks,setTasks] = useState([]);
    const{currentUser} = useSelector((state)=>state.user)
    console.log(myTasks)

    useEffect(()=>{
        const tasks = async()=>{
            
            try {
                const res = await fetch(`/api/getTask/${currentUser._id}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                })

                const data = await res.json()
                setTasks(data)
                
            } catch (error) {
                console.log(error.message)
            }
        }
        tasks();
    },[window.location.search])


    const handleComplete = async(id)=>{
        try {
            const res = await fetch(`/api/completeTask/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({completed: true})
            })

            const data = await res.json();
            console.log(data);
            if(res.ok)
            {
                window.location.reload()
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (

    <div>
        <div className="w-4/5 mx-auto flex flex-row gap-8 mt-8">
        {
            myTasks.length === 0 ? (
                <div>
                    <h1 className="text-center font-bold pt-3">No tasks yet</h1>
                </div>
            ):(
                myTasks.map((task)=>(
                <div className="w-[270px] shadow-sm rounded-[8px] h-[200px] border relative" key={task._id}>
                  {
                    
                    <div className=" flex flex-row justify-center p-4">
                      <div>
                        <h1 className="text-center font-bold pt-3">{task.title}</h1>
                        <p className="pt-3">{task.content}</p>
                      </div>
                      <div className="absolute w-4/5 bottom-2">
                        <div className="flex flex-row justify-around items-center">
                            {
                            
                                task.completed === false ? (
                                    <button  onClick={()=>handleComplete(task._id)} className="bg-blue-400 hover:bg-blue-500 mt-1 text-sm rounded-[9px] text-white px-4 py-2 w-full mx-auto rounded">
                                         <MdOutlineDoneOutline className="text-white-600 mx-auto cursor-pointer"/>
                                    </button>     
                                ):(
                                     <button disabled={true} className="bg-blue-400 flex items-center justify-around mt-1 text-sm rounded-[9px] text-white px-4 py-2 w-full mx-auto rounded">
                                            <h1>completed</h1> 
                                            <MdOutlineDoneOutline className="text-red-500 cursor-pointer"   />
                                    </button>   
                                )
                            }
                        </div>
                      </div>
                    </div>
                    
                  }
                </div>
            ))
            )    
        }
        </div>
    </div>
  )
}

export default Task

