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

// Loaders
import { getIndComic } from './utils/loaders/comicLoader.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/comics_collection',
        element: <ComicsAll/>
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
        path: '/user',
        element: <User />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <RegisterUser />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
