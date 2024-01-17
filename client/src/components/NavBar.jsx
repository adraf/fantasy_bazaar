// import axios from 'axios'
// import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { activeUser, removeToken } from "../utils/helpers/common"

export default function NavBar(){

  const userId = activeUser()
  
  // ! Can get the ID, need to find username with it and change navbar 'Hi' message
  // console.log('NAVBAR', userId)

  // const username = userInfo.username

  const navigateTo = useNavigate()

  function logOut() {
    removeToken()
    navigateTo('/')
    localStorage.clear()
  }

  return (
    <>
      <header>
        <div id="header-left-div">
        {/* <Link to='/character'>Character</Link> */}
        <Link to='/comics_collection'>Shop</Link>
        </div>
        <h1><Link to='/'>Fantasy Bazaar</Link></h1>
        {activeUser() ? 
          <div id="header-right-div">
            {/* <Link to={`/auth/user/${userId}/`}>Hi, {!userInfo.first_name ? username : userInfo.first_name}</Link> */}
            <Link to={`/auth/user/${userId}/`}>Account</Link>
            <Link to='/' onClick={logOut}>Logout</Link>
          </div>
          :
          <div id="header-right-div">
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        }
      </header>
    </>
  )
}