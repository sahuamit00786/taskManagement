import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentUser } from "../store/UserSlice"
const SignIn = () => {

  const[formData,setformData] = useState({})
  // console.log(formData)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const{currentUser} = useSelector((state)=>state.user)
  console.log(currentUser)

  const handleChange = (e) => {
    setformData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const res = await fetch('/api/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      dispatch(setCurrentUser(data))
      console.log(data)
      if(res.ok)
      {
        navigate('/')
      }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
    <div className="flex mt-[-70px] min-h-screen justify-center items-center">
       <div className=" mx-auto w-[400px] mt-[10px] border shadow-lg p-8">
        <h1 className="font-bold text-center text-xl mb-4">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
           <label className="py-1 font-medium" >Username</label>
           <input onChange={handleChange} id="username" type="text" placeholder="Enter your username" className="py-1 px-2 border rounded-[5px]" />
          </div>
        <div className="flex flex-col pb-4">
          <label className="py-1 font-medium">Password</label>
          <input onChange={handleChange} id="password" type="password" placeholder="Enter your password" className="py-1 px-2 border rounded-[5px]" />
        </div>
        </form>

        <div className="flex items-center justify-between">
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-bluse-700 text-white px-4 py-2 rounded-[10px]">Sign in</button>
            <span className="text-blue-500 hover:text-blue-700"><Link to='/signout'>dont have account</Link> </span>
        </div>
        </div>
      </div>
    </>
  )
}

export default SignIn