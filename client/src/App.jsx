import { Outlet } from "react-router-dom"
// Components
import Home from "./components/Home.jsx"

function App() {
  return (
    <>
      <Home />
      {/* <h1>Hello new project!</h1> */}
      <Outlet />
    </>
  )
}

export default App
