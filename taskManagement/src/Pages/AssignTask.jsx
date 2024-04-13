import { useEffect,useState } from "react"
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import loader from '/loader.svg'

const AssignTask = () => {

    const[user,setUser] = useState([])
    const[loading,setLoading] = useState(true)
    console.log(user)

    useEffect(()=>{
        const getAllUsers = async()=>{
            try {
                const res = await fetch('/api/users',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await res.json();
            console.log(data)
            setUser(data)
            setLoading(false)

            } catch (error) {
                console.log(error)        
            }   
        }
     getAllUsers();   

    },[window.location.reload])

    const handleDeleteUser = async(id) =>{
        console.log(id)
            try {
                const res = await fetch(`/api/deleteUser/${id}`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                const data = await res.json();
                console.log(data)
                window.location.reload()
                
            } catch (error) {
                console.log(error)
            }
    }

  return (
    <div className="flex flex-col mt-10 justify-center mx-auto w-full">
                <>
                    {
                        loading ? (
                            <div className="mx-auto mt-[150px]">
                                <img width='100px' src={loader} alt="" />
                            </div>
                        ):(
                            <div className="w-3/4 mx-auto">
                        <div className="w-full flex flex-row">
                            <div className="w-1/3 text-center font-semibold text-lg">Name</div>
                            <div className="w-1/3 text-center font-semibold text-lg">Email</div>
                            <div className="w-1/3 text-center">Actions</div>
                        </div>
                        <div className="mt-4">
                            {
                            user.map((user)=>(
    
                            <div key={user._id} className="w-full flex flex-row">
                                <div className="w-1/3 text-lg  text-center">{user.username}</div>
                                <div className="w-1/3 text-lg text-blue-600 font-semibold hover:text-blue-700 cursor-pointer text-center"><Link to={`/userTasks/${user._id}`}>{user.email}</Link></div>
                                <div className="w-1/3 text-center">
                                    <button onClick={()=>handleDeleteUser(user._id)} className="rounded border text-[#C28A50] px-2 py-1"><MdDelete/></button>
                                    <button className="rounded border px-2 py-1">
                                        <Link to={`/userTasks/${user._id}`}><MdAdd/></Link>
                                    </button>
                                </div>
                            </div>
                            ))
                        }
                        </div>
                    </div>
                        )
                    }
                    
                </>
    </div>
  )
}

export default AssignTask