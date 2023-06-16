// hooks
// components
import Navbar from "./components/shared/Navbar"
import Admin from "./pages/Admin/AdminDashboard"
import RegisterPage from "./components/RegisterPage"

import { ChakraProvider } from "@chakra-ui/react"
// components
// css
import "./App.css"
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom"
import OrganiserList from "./pages/Admin/OrganiserList"
import ActivityLog from "./pages/Admin/ActivityLog"

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				{/* <RegisterPage /> */}
				<Outlet /> {/* Render nested routes */}
			</Router>
		</div>
	)
}

export default App
