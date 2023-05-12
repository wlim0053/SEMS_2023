// hooks
import { useState } from 'react'
// components
import Navbar from './components/Navbar'
import Admin from './pages/Admin/AdminDashboard'
// css
import './App.css'
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom";
import OrganiserList from './pages/Admin/OrganiserList';
import ActivityLog from './pages/Admin/ActivityLog';
import Historypage from './components/Histotypage';

//<Navbar></Navbar>
//<Admin></Admin>
function App() {

	return (
		<div className="App">
			<Router>
				<Navbar></Navbar>
				<Historypage></Historypage>
			</Router>
		</div>
	);
}

export default App
