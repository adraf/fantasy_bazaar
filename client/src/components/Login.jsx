import axios from 'axios'
import { useLoaderData } from 'react-router-dom'
import { setToken } from '../utils/helpers/common'

export default function Login(){

  // Loaders
  const userInfo = useLoaderData()
  
  async function submitData(usersData) {
    try {
      const res = await axios.post('api/auth/login/', usersData)
      const stagedData = res.data
      setToken(stagedData.access)
      window.location.href = '/'
      return stagedData
    } catch (error) {
      console.log(error)
    }
  }

  function authenticate(event) {
    event.preventDefault()
    const loginData = new FormData(event.target)
    const usersData = Object.fromEntries(loginData.entries())
    // search through list of users for matching username and return the id for that user
    userInfo.forEach(userVal => {
      if (userVal.username === usersData.username) {
        localStorage.setItem('current_username', userVal.username)
        return userVal
      }
    })
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