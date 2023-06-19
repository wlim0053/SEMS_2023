// hooks
// components
import Navbar from "./components/shared/Navbar"
import Admin from "./pages/admin/AdminDashboard"

import { ChakraProvider } from "@chakra-ui/react"
// components
import LoginPage from "./components/LoginPage"
// css
import "./App.css"
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom"
import OrganiserList from "./pages/admin/OrganiserList"
import ActivityLog from "./pages/admin/ActivityLog"
import NewHistoryPage from "./components/NewHistoryPage"
import Testlandingpage from "./components/Testlandingpage"

function App() {
	return (
		<div className="App">
			<NewHistoryPage/>
		</div>
	)
}

export default App
