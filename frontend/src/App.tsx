// hooks
import { useState } from 'react'
// components
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Testlandingpage from './components/Testlandingpage'
// css
import './App.css'


//<Navbar></Navbar>
//<Admin></Admin>
function App() {

  	return (
    	<div className="App">
			<Testlandingpage></Testlandingpage>
    	</div>
  )
}

export default App
