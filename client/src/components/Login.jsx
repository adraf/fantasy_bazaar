import axios from 'axios'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { activeUser, getToken, setToken } from '../utils/helpers/common'
import { useOutletContext } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast'
import { useState } from 'react'

export default function Login(){
  
  // eslint-disable-next-line no-unused-vars
  const [mainUserInfo, setMainUserInfo] = useOutletContext()
  const [showToast, setShowToast] = useState(false)
  const toggleShowToast = () => setShowToast(!showToast)

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
      setShowToast(true)
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
    <section id='login-main'>
      <Toast show={showToast} onClose={toggleShowToast} className='position-absolute top-50 start-50 translate-middle bg-dark text-white'>
        <Toast.Header className='bg-dark text-white' closeVariant='white'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
          </svg>
          <strong className="me-auto ms-auto">Login Error</strong>
        </Toast.Header>
        <Toast.Body className='text-center'>Your Login details are incorrect</Toast.Body>
      </Toast>
      <div className='form-div-container' id='login-container'>
        <form action='#' onSubmit={authenticate} id='login-form'>
          <input type='text' name='username' placeholder='Username'/>
          <input type='password' name='password' placeholder='Password' />
          <button type='submit'>Login</button>
        </form>
        <button><Link to='/register'>Register</Link></button>
      </div>
    </section>
  )
}