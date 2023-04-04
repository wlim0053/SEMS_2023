// hooks
import { useState } from 'react'
// components
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
// css
import './App.css'


function App() {

  	return (
    	<div className="App">
      		<Navbar></Navbar>
      		<Admin></Admin>
    	</div>
  )
}

export default App
