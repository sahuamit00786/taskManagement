import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDoneOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const UserTasks = () => {

    const {id} = useParams()

    const[editedData,seteditedData] = useState({});
    const[formData,setFormData] = useState({});
    const[tasks,setTasks] = useState([]);
    const[taskKey,settaskKey] = useState(null);
    // console.log(taskKey)
    console.log(editedData)


    // console.log(formData)

    const currentTime = new Date().getTime();
    console.log("currentTime",currentTime)
    
    useEffect(()=>{
        const getUserData = async()=>{
            try {
                const res = await fetch(`/api/getTask/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await res.json()
            console.log(data)
            setTasks(data);
            console.log('compiling')

            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
        
    },[window.location.reload])

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const completeData = {
            ...formData,
            createdFor: id
        }

        try {
            const res = await fetch('/api/newTask',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(completeData)
            })

            const data = await res.json();
            if(res.ok)
            {
                setTasks({...tasks, data});
                window.location.reload()
            }
            // console.log(data);

        } catch (error) {
            console.log(error)
        }
    }

    const handleEditChange = (e)=>{
        seteditedData({...editedData,[e.target.id]:e.target.value});
    }

     const handleEdit = async(id)=>{
        // e.preventDefault()
        settaskKey(id)
        console.log('id',id)
        try {
            const res = await fetch(`/api/editTask/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(editedData)
            })

            const data = await res.json();
            console.log(data)
            // console.log(data);
            window.location.reload()
            settaskKey(null)

        } catch (error) {
            console.log(error)
        }
    }

     const handleDelete = async(id)=>{
        
        try {
            const res = await fetch(`/api/deleteTask/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
        })
        const data = await res.json()
        console.log(data)
        if(res.ok)
        {
            setTasks(tasks.filter(task => task._id !== id));
            console.log('task deleted successfully')
        }

        } catch (error) {
            console.log(error.message)
        }
    }
  
    return (
        <div>
            <div className="w-5/6 mt-[60px] h-[200px] mb-[100px] flex flex-col md:flex-row flex-wrap mx-auto gap-6">
                {/* Task mapping */}
                {tasks.map((task) => (
                    <div className="w-[270px] shadow-sm rounded-[8px] h-[280px] border relative" key={task._id}>
                        {
                            taskKey === task._id ? (
                                <div className="w-[270px] h-full flex justify-center items-center rounded-[8px] shadow-sm border-[2px]">

                                    <div className="flex flex-col justify-center p-4">
                                        <form action="">
                                            <input
                                                defaultValue={task.title}
                                                type="text"
                                                id="title"
                                                onChange={handleEditChange}
                                                placeholder="Enter task title"
                                                className="border w-[240px] rounded p-2 mb-2"
                                            />
                                            <textarea
                                                defaultValue={task.content}
                                                id="content"
                                                placeholder="Enter task description"
                                                onChange={handleEditChange}
                                                className="border w-[240px] rounded p-2 mb-2"
                                            ></textarea>
                                        </form>
                                        <input type="datetime-local" id='deadline' onChange={handleEditChange} className='px-8 py-2' />
                                        <button
                                            onClick={() => handleEdit(task._id)}
                                            className="bg-blue-500 hover:bg-blue-700 mt-1 rounded-[9px] text-white px-4 py-2 rounded"
                                        >
                                            Update Task
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className=" flex flex-col justify-center p-4">
                                    <div className='relative'>
                                        <div className='h-[180px]'>
                                            <h1 className="text-center text-lg font-bold pt-3">{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</h1>
                                            <p className="pt-3">{task.content.charAt(0).toUpperCase() + task.content.slice(1)}</p>
                                        </div>

                                        <hr className='w-full' />

                                        <div className='text-center mx-auto pt-2 w-full'>
                                            Deadline :
                                            <span className='pl-2'>
                                                {new Date(task.deadline).toLocaleDateString()}
                                            </span>
                                            <span className='pl-2'>
                                                {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute w-4/5 bottom-2">
                                        <div className="flex flex-row justify-around items-center">
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="bg-blue-500 hover:bg-blue-700 mt-1 text-sm rounded-[9px] text-white px-4 py-2 rounded"
                                            >
                                                <MdOutlineDoneOutline />
                                            </button>
                                            <button type='button'
                                                onClick={()=>settaskKey(task._id)}
                                                className="bg-blue-500 hover:bg-blue-700 mt-1 text-sm rounded-[9px] text-white px-4 py-2 rounded"
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="bg-blue-500 font-bold hover:bg-blue-700 mt-1 text-sm rounded-[9px] text-white px-4 py-2 rounded"
                                            >
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                ))}
                {/* Create new task form */}
                <div className="w-[270px] flex justify-center items-center rounded-[8px] shadow-sm border-[2px]">
                    <div className=" flex flex-col justify-center p-4">
                        <form onSubmit={handleSubmit} action="">
                            <input
                                type="text"
                                id="title"
                                onChange={handleChange}
                                placeholder="Enter task title"
                                className="border w-[240px] rounded p-2 mb-2"
                            />
                            <textarea id="content" placeholder="Enter task description" onChange={handleChange} className="border rounded w-[240px] p-2 mb-2"></textarea>
                            <div className='flex justify-center'>
                                <input id='deadline' onChange={handleChange} className='text-gray-600' type="datetime-local" />
                            </div>
                        </form>
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 mt-4 hover:bg-blue-700 mt-1 rounded-[9px] text-white px-4 py-2 rounded"
                        >
                            Create Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTasks