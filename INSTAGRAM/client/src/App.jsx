import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/feed' element = {<Home/>}/>
        <Route path='/profile' element = {<Profile/>}/>
      </Routes>
    </>
  )
}

export default App