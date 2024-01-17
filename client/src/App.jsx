import { Outlet } from 'react-router-dom'
// Components
import NavBar from './components/NavBar.jsx'
// import { useState } from 'react'

// state for user = null

// on token update run function useEffect(page load and update state on token change)
// make call for user info

// pass userState to navbar

function App() {
  return (
    <>
      <NavBar />
      {/* <h1>Hello new project!</h1> */}
      <Outlet />
    </>
  )
}

export default App
