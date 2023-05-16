// hooks
import { useState } from 'react'
// components
import Navbar from './components/Navbar'
import Admin from './pages/Admin/AdminDashboard'

import { ChakraProvider } from '@chakra-ui/react';
// components
import LoginPage from './components/LoginPage';
// css
import './App.css'
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom";
import OrganiserList from './pages/Admin/OrganiserList';
import ActivityLog from './pages/Admin/ActivityLog';

const App = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
	return (
		<div className="App">
			<Router>
				<Navbar />\
        <>
        {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>Logged in successfully!</div>
      )}
        </>
        
				<Outlet /> {/* Render nested routes */}
			</Router>
		</div>
	);
}

export default App;

