// hooks
// components
import Navbar from "./components/shared/Navbar";
import Admin from "./pages/Admin/AdminDashboard";
import RegisterPage from "./pages/student/RegisterPage";

import { ChakraProvider } from "@chakra-ui/react";
// components
// css
import "./App.css";
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom";
import NewHistoryPage from "./pages/student/HistoryPage";
// import OrganiserList from "./pages/admin/OrganiserList";
// import ActivityLog from "./pages/admin/ActivityLog";

// testing
import OrganiserMainPage from "./pages/Organiser/OrganiserMainPage";
import StudentEvents from "./components/student/StudentEvents";
import NewLandingPage from "./pages/student/NewLandingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Outlet /> {/* Render nested routes */}
        <NewLandingPage />
      </Router>
    </div>
  );
}

export default App;
