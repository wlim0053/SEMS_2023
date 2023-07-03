// hooks
// components
import Navbar from "./components/shared/Navbar"
import Admin from "./pages/Admin/AdminDashboard"

import { ChakraProvider } from "@chakra-ui/react";
// components
// css
import "./App.css"
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom"
import theme from "./utils/theme"
import LoginPage from "./pages/shared/LoginPage"

function App() {
	return (
		<ChakraProvider theme={theme}> {/* Wrap your app with ChakraProvider and pass the theme */}
		<div className="App">
			<Router>
				<Navbar/>
				<Outlet /> {/* Render nested routes */}
			</Router>
		</div>
		</ChakraProvider>
	)
}


export default App;