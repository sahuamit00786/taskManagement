import { useEffect,useState } from "react"
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const AssignTask = () => {

    const[user,setUser] = useState([])
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

            } catch (error) {
                console.log(error)        
            }   
        }
     getAllUsers();   

    },[])

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
                
            } catch (error) {
                console.log(error)
            }
    }

  return (
    <div className="flex flex-col mt-10 justify-center mx-auto w-full">
                <>
                    <div className="w-full mx-auto mt-3">
                        <table className="w-full mx-auto">
                            <thead className="mb-4">
                                <tr>
                                    <th className="w-1/3">Username</th>
                                    <th className="w-1/3">Email</th>
                                    <th className="w-1/3"></th>
                                </tr>
                            </thead>
                            <tbody className="mx-auto">
                                {
                                    user.map((user)=>( 
                                        <>
                                            <tr key={user._id}>
                                            <td className="w-1/3 font-semibold text-center">{user.username}</td>
                                            <td  className="w-1/3 text-blue-400 cursor-pointer hover:text-blue-700 font-semibold text-center"><Link to={`/userTasks/${user._id}`}>{user._id}</Link></td>
                                            <td className="w-1/3 font-semibold text-center">
                                                <div className="flex flex-row gap-2">
                                                    <button className="rounded border px-2 py-1"><MdDelete/></button>
                                                    <button className="rounded border px-2 py-1"><MdAdd/></button>
                                                </div>
                                            </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </>
    </div>
  )
}

export default AssignTask