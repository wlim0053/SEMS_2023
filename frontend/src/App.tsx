// hooks
// components
import Navbar from "./components/shared/Navbar";
import Admin from "./pages/Admin/AdminDashboard";
import RegisterPage from "./components/RegisterPage";

import { ChakraProvider } from "@chakra-ui/react";
// components
// css
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
