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
import { getIndComic, filteredComicData, getRandomTen, getComicData, filteredCharacterComicData } from './utils/loaders/comicLoader.js'
import { getIndUser, getUserData } from './utils/loaders/userLoader.js'
import { getAllCharacters, getAllAuthors, getIndCharacter, homeCharsSix } from './utils/loaders/characterLoader.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async({ params }) => {
          const [comicInfo, characterInfo] = await Promise.all([
            getRandomTen(params.id),
            homeCharsSix(params.id)
          ])
          return{comicInfo, characterInfo}
        }
      },
      {
        path: '/comics_collection',
        element: <ComicsAll/>,
        // loader: async ({ params }) => getComicData(params.id)
        loader: async({ params }) => {
          const [comicInfo, characterInfo, authorInfo] = await Promise.all([
            getComicData(params.id),
            getAllCharacters(params.id),
            getAllAuthors(params.id)
          ])
          return{comicInfo, characterInfo, authorInfo}
        }
      },
      {
        path: '/comics/:id',
        element: <ComicSingle />,
        loader: async ({ params }) => getIndComic(params.id)
      },
      {
        path: '/characters/:id',
        element: <Character />,
        loader: async ({ params }) => {
          const [charInfo, comicInfo] = await Promise.all([
            getIndCharacter(params.id),
            filteredCharacterComicData(params.id)
          ])
          return {charInfo, comicInfo}
        }
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
