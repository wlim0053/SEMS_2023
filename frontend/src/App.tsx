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

import StudentEvents from "./components/StudentEvents"
import NewLandingPage from "./components/NewLandingPage"

function App() {
  return (
    <div className="App">
      <NewLandingPage/>
    </div>
  );
}

export default App;
