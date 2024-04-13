import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setDeleteUser } from "../store/UserSlice"

const Header = () => {

  const{currentUser} = useSelector((state)=>state.user) 
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSignOut = async()=>{
    try {
        const res = await fetch('/api/signout',{
        method:'POST',
    })
    const data = await res.json();
    console.log(data)
    if(!res.ok)
    {
        console.log('not able to sign out')
    }
    else{
        dispatch(setDeleteUser())
        navigate('/')
    }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Link to="/">
                    <img src='http://oikoshreemgroup.com/wp-content/uploads/2023/01/logo-10-1.png' alt="logo" className="w-35 m-3 h-20" />
                </Link>
            </div>
            <div className="flex text-blue-500a mt-[-10px] font-semibold text-md gap-12 pr-[40px] md:pr-[200px] items-center">
                <Link to="/">
                    <button className="hover:text-blue-800">Home</button>
                </Link>
                {
                    currentUser?
                    <Link>
                        <button onClick={handleSignOut} className="hover:text-blue-800">Sign out</button>
                    </Link>
                    :
                    <Link to="/signin">
                        <button className="hover:text-blue-800">Sign in</button>
                    </Link>
                }
                {
                    currentUser?
                    (''):(
                    <>
                        <Link to="/signout">
                        <button className="hover:text-blue-800">Sign up</button>
                    </Link>
                    </>
                    )
                }
                {
                    currentUser && currentUser.isAdmin?(
                        <Link to="/assignTasks">
                            <button className="hover:text-blue-800">Assign Task</button>
                        </Link>
                    ):(
                        <Link to="/tasks">
                          <button className="hover:text-blue-800">Your Task</button>
                        </Link>
                    )
                }
                
            </div>
        </div>
    </div>
  )
}

export default Header