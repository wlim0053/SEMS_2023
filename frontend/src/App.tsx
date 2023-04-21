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
// hooks
import { useState } from "react";
// components
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import { Box } from "@chakra-ui/react";
// css

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

export default App;
