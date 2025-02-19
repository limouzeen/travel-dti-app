import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyTravel from './MyTravel'
import EditMyTravel from './EditMyTravel'
import AddMyTravel from './AddMyTravel'
import EditProfile from './EditProfile'
import Login from './Login'
import Register from './Register'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <>
    <CssBaseline/>
    <BrowserRouter>
      <Routes>  
        <Route>
          <Route path="/" element={<Login/> } />
          <Route path="/register" element={<Register/> } />
          <Route path="/mytravel" element={<MyTravel/> } />
          <Route path="/editmytravel" element={<EditMyTravel/> } />
          <Route path="/addmytravel" element={<AddMyTravel/> } />
          <Route path="/editprofile" element={<EditProfile/> } />
        </Route>
      </Routes>

   </BrowserRouter>
    
    </>
   
  )
}

export default App
