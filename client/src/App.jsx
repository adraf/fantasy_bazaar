import { Outlet } from 'react-router-dom'
// Components
import NavBar from './components/NavBar.jsx'
// import { useState } from 'react'

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
