// hooks
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
