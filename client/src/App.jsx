import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { activeUser } from './utils/helpers/common.js'
import { getToken } from '../src/utils/helpers/common.js'
import axios from 'axios'
import NavBar from './components/NavBar.jsx'

function App() {
  
  const [mainUserInfo, setMainUserInfo] = useState([])

  useEffect(() => {
    async function handleUserData() {
      const res = await axios.get(`api/auth/user/${activeUser()}/`, {
        headers: {
          'Authorization': 'Bearer ' + getToken()
        }
      })
      mainUserInfo.id !== activeUser() && setMainUserInfo(res.data)
      // console.log('MAIN STATE', mainUserInfo)
      return res.data
    }
    handleUserData()
    console.log('MAIN STATE', mainUserInfo)
  }, [mainUserInfo])
 

  return (
    <>
      <NavBar mainUserInfo={mainUserInfo} setMainUserInfo={setMainUserInfo}/>
      <Outlet context={[mainUserInfo, setMainUserInfo]}/>
    </>
  )
}
export default App
