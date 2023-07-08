// hooks
import React, { useState, useContext} from "react";
// components
import Navbar from "./components/shared/Navbar";
import Admin from "./pages/Admin/AdminDashboard";
import RegisterPage from "./pages/student/RegisterPage";
import CreateEventPage from "./pages/Organiser/CreateEventPage";
import { ChakraProvider } from "@chakra-ui/react";
// components
// css
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import ACLvlContext, { Aclvl } from "./components/shared/ACLvlContext";
// import OrganiserList from "./pages/admin/OrganiserList";
// import ActivityLog from "./pages/admin/ActivityLog";

// testing
import OrganiserMainPage from "./pages/Organiser/OrganiserMainPage"
import NewLandingPage from "./pages/student/NewLandingPage";
import LoginPage from "./pages/student/LoginPage";
import StudentHome from "./pages/student/StudentHome";
import EventHome from "./pages/student/EventHome";
import EventDetailsDashboard from "./pages/Organiser/EventDetailsDashboard";
import EventApproval from "./pages/Admin/EventApproval";
import NewHistoryPage from "./pages/student/HistoryPage";
import FeedbackPage from "./pages/student/FeedbackPage";
import OrganiserList from "./pages/Admin/OrganiserList";



function App() {
  const [aclvl, setAclvl] = useState<Aclvl>({user_access_level: ""})
  
  return (
    <div className="App">   
      <Router>
      {aclvl.user_access_level  !=="" ? (<Navbar />)  :  null } 
      {aclvl.user_access_level !=="" ? null : (<LoginPage />)}
        {/* <LoginPage /> */}
        <ACLvlContext.Provider value={{aclvl, setAclvl}}> 
        <Routes>
        <Route path="/Navbar" element={<Navbar/>} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/NewLandingPage" element={<NewLandingPage />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/EventHome" element={<EventHome />} />
        <Route path="/NewHistoryPage" element={<NewHistoryPage />} />
        <Route path="/FeedbackPage" element={<FeedbackPage />} />
              {/* Organiser view */}
        <Route path="/OrganiserMainPage" element={<OrganiserMainPage />} />
        <Route path="/CreateEventPage" element={<CreateEventPage />} />
        <Route path="/EditEventPage" element={<RegisterPage />} />
        <Route path="/EventDetailsDashboard" element={<EventDetailsDashboard />} />

              {/* Admin view */}
        <Route path="/Admin" element={<Admin />} />
        <Route path="/OrganiserList" element={<OrganiserList />} />
        <Route path="/EventApproval" element={<EventApproval />} />
        </Routes>
        </ACLvlContext.Provider> 
        <Outlet /> {/* Render nested routes */}
      </Router>
    </div>
  );
}

export default App;
