// hooks
import { useState } from 'react'
// components
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Testlandingpage from './components/Testlandingpage'
// css
import './App.css'
import Historypage from './components/Histotypage'


//<Navbar></Navbar>
//<Admin></Admin>
function App() {

  	return (
    	<div className="App">
			<Navbar></Navbar>
			<Historypage></Historypage>
    	</div>
  )
}

export default App
