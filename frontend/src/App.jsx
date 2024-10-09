import React from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Profile from './components/Profile'

const browserRouter = createBrowserRouter([
  {
    path : '/',
    element : <MainLayout/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/profile/:id',
        element : <Profile/>
      }
    ]
  },
  {
    path : '/login',
    element : <Login/>
  },
  {
    path:"/signup",
    element : <Signup/>
  }
])

export default function App() {
  return (
    <>
   <RouterProvider router={browserRouter}/>
    </>
  )
}
