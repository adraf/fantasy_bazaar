import { Link, useNavigate } from "react-router-dom"
import { activeUser, removeToken } from "../utils/helpers/common"
import Toast from 'react-bootstrap/Toast'
import { useState } from "react"

export default function NavBar({ mainUserInfo, setMainUserInfo }){

  const userId = activeUser()  
  const {first_name, username } = mainUserInfo

  const [showToastDEL, setShowToastDEL] = useState(false)
  const toggleShowToastDEL = () => setShowToastDEL(!showToastDEL)

  const navigateTo = useNavigate()

  function logOut() {
    removeToken()
    navigateTo('/')
    setMainUserInfo('')
    localStorage.clear()
  }

  if (localStorage.getItem('message') !== null) {
    setShowToastDEL(true)
    localStorage.removeItem('message')
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
            <Link to={`/auth/user/${userId}/`}>Hi, {!first_name ? username : first_name}</Link>
            <Link to='/' onClick={logOut}>Logout</Link>
          </div>
          :
          <div id="header-right-div">
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        }
      </header>
      <Toast show={showToastDEL} onClose={toggleShowToastDEL} className='position-absolute top-50 start-50 translate-middle bg-dark text-white'>
        <Toast.Header className='bg-dark text-white' closeVariant='white'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
          </svg>
          <strong className="me-auto ms-auto">Account</strong>
        </Toast.Header>
        <Toast.Body className='text-center'>You have successfully deleted your account</Toast.Body>
      </Toast>
    </>
  )
}