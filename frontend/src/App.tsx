// hooks
// components
import Navbar from "./components/shared/Navbar";
import Admin from "./pages/Admin/AdminDashboard";

import { ChakraProvider } from "@chakra-ui/react";
// components
// css
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

// import OrganiserList from "./pages/admin/OrganiserList";
// import ActivityLog from "./pages/admin/ActivityLog";

// testing
import OrganiserMainPage from "./pages/Organiser/OrganiserMainPage"

import StudentEvents from "./components/StudentEvents"



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
