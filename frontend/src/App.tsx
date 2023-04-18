// hooks
import { useState } from 'react'
// components
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
// css
import './App.css'
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom";
import OrganiserList from './pages/OrganiserList';
import ActivityLog from './pages/ActivityLog';

function App() {

  	return (
    	<div className="App">
			<Router>
				<Navbar />
				<Outlet /> {/* Render nested routes */}
			</Router>
		</div>
  );
}

export default App
