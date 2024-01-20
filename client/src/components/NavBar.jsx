import { Link, useNavigate } from "react-router-dom"
import { activeUser, removeToken } from "../utils/helpers/common"
// import { useEffect, useState } from "react"

export default function NavBar({ mainUserInfo, setMainUserInfo }){

  const userId = activeUser()  
  const {first_name, username } = mainUserInfo
  const navigateTo = useNavigate()
  // const comicsAllPage = useLocation()
  // const [filterButton, setFilterButton] = useState(false)

  // useEffect(() => {
  //   function addFilterButton() {
  //     comicsAllPage.pathname === '/comics_collection' ? setFilterButton(true) : setFilterButton(false)  
  //   }
  //   addFilterButton()
  // }, [comicsAllPage])

  function logOut() {
    removeToken()
    navigateTo('/')
    setMainUserInfo('')
    localStorage.clear()
  }

  return (
    <>
      <header>
        {/* {filterButton ? 
          <div id="header-left-div">
            <Link id="filterButton-nav">Filter</Link>
            <Link to='/comics_collection'>Shop</Link>
          </div>
          : */}
          <div id="header-left-div">
            <Link to='/comics_collection'>Shop</Link>
          </div>
        {/* } */}
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
    </>
  )
}