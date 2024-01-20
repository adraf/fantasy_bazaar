import { Outlet, useNavigation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { activeUser } from './utils/helpers/common.js'
import { getToken } from '../src/utils/helpers/common.js'
import axios from 'axios'
import NavBar from './components/NavBar.jsx'
import Spinner from 'react-bootstrap/Spinner';

function App() {
  
  const [mainUserInfo, setMainUserInfo] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    async function handleUserData() {
      const res = await axios.get(`/api/auth/user/${activeUser()}/`, {
        headers: {
          'Authorization': 'Bearer ' + getToken()
        }
      })
      mainUserInfo.id !== activeUser() && setMainUserInfo(res.data)
      return res.data
    }
    handleUserData()
    // console.log('MAIN STATE', mainUserInfo)
  }, [mainUserInfo])

  return (
    <>
      <NavBar mainUserInfo={mainUserInfo} setMainUserInfo={setMainUserInfo}/>
      <main>
        {
          navigation.state === 'idle' ?
          <Outlet context={[mainUserInfo, setMainUserInfo]} />
          :
          <div className="spinner">
            {/* <img src="https://i0.wp.com/boingboing.net/wp-content/uploads/2015/10/pJReN4H1.gif?w=970" alt="loading..." /> */}
            <Spinner animation="border">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }
      </main>
    </>
  )
}
export default App
