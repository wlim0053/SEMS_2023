// hooks
// components
import Navbar from "./components/shared/Navbar"
import Admin from "./pages/admin/AdminDashboard"
import RegisterPage from "./components/RegisterPage"

import { ChakraProvider } from "@chakra-ui/react"
// components
// css
import "./App.css"
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom"
import OrganiserList from "./pages/admin/OrganiserList"
import ActivityLog from "./pages/admin/ActivityLog"

function App() {
	return (
		<div className="App">
			<Router>
				<RegisterPage />
				<Outlet /> {/* Render nested routes */}
			</Router>
		</div>
	)
}

export default App
