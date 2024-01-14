// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login(){

  // States
  // const [userData, setUserData] = 

  const navigateTo = useNavigate()
  
  async function submitData(usersData) {
    try {
      const res = await axios.post('api/auth/login/', usersData)
      const stagedData = res.data
      // console.log('Success', stagedData)
      navigateTo('/')
      return stagedData
    } catch (error) {
      console.log(error)
    }
  }

  function authenticate(event) {
    event.preventDefault()
    const loginData = new FormData(event.target)
    const usersData = Object.fromEntries(loginData.entries())
    // console.log('authenticate', usersData)
    submitData(usersData)
  }

  return (
    <>
      <h1>Login</h1>
      <div>
        <form action='#' onSubmit={authenticate}>
          <input type='text' name='username' placeholder='Username'/>
          <input type='password' name='password' placeholder='Password' />
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  )
}