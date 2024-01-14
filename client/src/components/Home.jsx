import { Link } from "react-router-dom"

export default function Home(){
  return (
    <>
      <h1>Home</h1>
        <div>
          <Link to='/character'>Character</Link>
          <Link to='/comics_collection'>ComicsAll</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>RegisterUser</Link>
          <Link to='/user'>User</Link>
        </div>
    </>
  )
}