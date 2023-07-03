// hooks
// components
import Navbar from "./components/shared/Navbar";
import Admin from "./pages/Admin/AdminDashboard";
import RegisterPage from "./components/RegisterPage";

import { ChakraProvider } from "@chakra-ui/react";
// components
// css
<<<<<<< HEAD
import "./App.css"
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom"
import OrganiserList from "./pages/admin/OrganiserList"
import ActivityLog from "./pages/admin/ActivityLog"
import OrganiserMainPage from "./pages/Organiser/OrganiserMainPage"
=======
import "./App.css";
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom";
import NewHistoryPage from "./components/NewHistoryPage";
// import OrganiserList from "./pages/admin/OrganiserList";
// import ActivityLog from "./pages/admin/ActivityLog";

// testing
import Testlandingpage from "./components/Testlandingpage"
import StudentEvents from "./components/StudentEvents"
import NewLandingPage from "./components/NewLandingPage"
import Testing from "./components/Testing"
>>>>>>> 274c32a3e49aa1b2bcf450e2033f8680a3797b3c

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Outlet /> {/* Render nested routes */}
        {/* <NewHistoryPage /> */}
      </Router>
    </div>
  );
}

export default App;