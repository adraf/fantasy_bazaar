import axios from 'axios'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { activeUser, getToken, setToken } from '../utils/helpers/common'
import { useOutletContext } from 'react-router-dom'

export default function Login(){
  
  // eslint-disable-next-line no-unused-vars
  const [mainUserInfo, setMainUserInfo] = useOutletContext()

  // Loaders
  const userInfo = useLoaderData()
  const navigate = useNavigate()
  async function submitData(usersData) {
    try {
      const res = await axios.post('api/auth/login/', usersData)
      const stagedData = res.data
      setToken(stagedData.access)
      // console.log('STAGED', stagedData)
      getIndUser(activeUser())
      navigate('/')
      
      return stagedData
    } catch (error) {
      console.log(error)
    }
  }

  async function getIndUser(id) {
    const res = await axios.get(`api/auth/user/${id}/`, {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    })
  
    setMainUserInfo(res.data)
    // console.log('Loader In Login', res.data)
    return res.data
  }

  function authenticate(event) {
    event.preventDefault()
    const loginData = new FormData(event.target)
    const usersData = Object.fromEntries(loginData.entries())
    // search through list of users for matching username and return the id for that user
    userInfo.forEach(userVal => {
      if (userVal.username === usersData.username) {
        return userVal
      }
    }
    )
    submitData(usersData)
  }

  return (
    <>
      <h2>Login</h2>
      <div>
        <form action='#' onSubmit={authenticate}>
          <input type='text' name='username' placeholder='Username'/>
          <input type='password' name='password' placeholder='Password' />
          <button type='submit'>Login</button>
        </form>
      </div>
      <button><Link to='/register'>Register</Link></button>
    </>
  )
}