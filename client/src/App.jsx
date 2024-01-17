import { Outlet } from 'react-router-dom'
// import { useEffect, useState } from 'react'
import NavBar from './components/NavBar.jsx'
// import { activeUser } from "../src/utils/helpers/common.js"
// import { getIndUser } from './utils/loaders/userLoader.js'
// import { useLoaderData } from 'react-router-dom'
// import { getToken } from '../src/utils/helpers/common.js'
// import axios from 'axios'

function App() {

  // state for user = null
// const [userInfo, setUserInfo] = useState('')

// on token update run function useEffect(page load and update state on token change)
// make call for user info
// useEffect(() => {
//   async function handleUserData() {
//     const userId = activeUser()
//     const res = await axios.get(`api/auth/user/${userId}/`, {
//       headers: {
//         'Authorization': 'Bearer ' + getToken()
//       }
//     })
//     setUserInfo(res.data)
//     return res.data
//   }
//   handleUserData()
// }, [])

  return (
    <>
      {/* pass userState to navbar */}
      {/* <NavBar userInfo={userInfo} setUserInfo={setUserInfo} /> */}
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
