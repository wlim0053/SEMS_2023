// hooks
// components
import Navbar from './components/Navbar'
// css
import './App.css'
import { BrowserRouter as Router, Route, Outlet } from "react-router-dom";
import OrganiserList from './pages/Admin/OrganiserList';
import ActivityLog from './pages/Admin/ActivityLog';

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
