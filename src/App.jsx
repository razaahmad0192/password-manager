import React from 'react'
import Navbar from './components/Navbar'
import PassManager from './components/PassManager'
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import {  ToastContainer } from "react-toastify";
import HomePage from './components/HomePage';
function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/passwords" element={<PassManager />} />
      </Routes>
    </BrowserRouter>
      <ToastContainer  position='top-right'/>
    
    
    </>
  )
}

export default App
