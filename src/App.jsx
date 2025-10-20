import React from 'react'
import Navbar from './components/Navbar'
import PassManager from './components/PassManager'
import {  ToastContainer } from "react-toastify";
function App() {
  return (
    <div >

      <Navbar/>
      <ToastContainer  position='top-right'/>
      <PassManager/>
    </div>
  )
}

export default App
