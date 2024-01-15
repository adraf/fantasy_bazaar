// import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { activeUser, getToken, removeToken } from "../utils/helpers/common"

export default function NavBar(){

  // States
  const [isAuth, setIsAuth] = useState(false)
  // const userId = localStorage.getItem('current_user_id')
  const userId = activeUser()

  const username = localStorage.getItem('current_username')

  const navigateTo = useNavigate()

  useEffect(() => {
    if (getToken() !== null) {
      setIsAuth(true)
    } 
  }, [isAuth])

  function logOut() {
    removeToken()
    localStorage.clear()
    setIsAuth(false)
    navigateTo('/')
  }

  return (
    <>
      <h1><Link to='/'>Nav</Link></h1>
        <div>
          <Link to='/character'>Character</Link>
          <Link to='/comics_collection'>ComicsAll</Link>
          {isAuth === true ? 
            <div>
              <Link to={`/auth/user/${userId}/`}>Hi, {username}</Link>
              <Link to='/' onClick={logOut}>Logout</Link>
            </div>
            :
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </div>
          }
        </div>
    </>
  )
}