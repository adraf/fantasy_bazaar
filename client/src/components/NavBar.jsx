import { Link, useNavigate } from "react-router-dom"
import { activeUser, removeToken } from "../utils/helpers/common"
// import { useEffect, useState } from "react"

export default function NavBar({ mainUserInfo, setMainUserInfo }){

  const userId = activeUser()  
  const {first_name, username } = mainUserInfo
  const navigateTo = useNavigate()

  function logOut() {
    removeToken()
    navigateTo('/')
    setMainUserInfo('')
    localStorage.clear()
  }

  return (
    <>
      <header>
        <div id="header-left-div">
          <Link id="desktop-nav-button" to='/comics_collection'>Shop</Link>
        </div>
        <h1><Link to='/'>Fantasy Bazaar</Link></h1>
        {activeUser() ? 
          <div id="header-right-div">
            <Link className="mobile-nav-button" to='/comics_collection'>Shop</Link>
            <Link to={`/auth/user/${userId}/`}>Hi, {!first_name ? username : first_name}</Link>
            <Link to='/' onClick={logOut}>Logout</Link>
          </div>
          :
          <div id="header-right-div">
            <Link className="mobile-nav-button" to='/comics_collection'>Shop</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        }
      </header>
    </>
  )
}