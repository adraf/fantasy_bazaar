// import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'

// Page Components
import App from './App.jsx'
import Character from './components/Character.jsx'
import ComicsAll from './components/ComicsAll.jsx'
import ComicSingle from './components/ComicSingle.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import User from './components/User.jsx'
import UserEdit from './components/UserEdit.jsx'

// Loaders
import { getIndComic, filteredComicData, getRandomTen, getComicData } from './utils/loaders/comicLoader.js'
import { getIndUser, getUserData } from './utils/loaders/userLoader.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async ({ params }) => getRandomTen(params.id)
      },
      {
        path: '/comics_collection',
        element: <ComicsAll/>,
        loader: async ({ params }) => getComicData(params.id)
      },
      {
        path: '/comics/:id',
        element: <ComicSingle />,
        loader: async ({ params }) => getIndComic(params.id)
      },
      {
        path: '/character',
        element: <Character />
      },
      {
        path: '/auth/user/:id',
        element: <User/>,
        loader: async ({ params }) => {
          const [userInfo, comicInfo] = await Promise.all([
            getIndUser(params.id),
            filteredComicData(params.id)
          ])
          return {userInfo, comicInfo}
        }
      },
      {
        path: '/login',
        element: <Login />,
        loader: async ({ params }) => getUserData(params.id)
      },
      {
        path: '/register',
        element: <RegisterUser />,
      },
      {
        path: '/auth/user/:id/edit',
        element: <UserEdit />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
