// hooks
// components
import Navbar from './components/Navbar'
// css
import './App.css'
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import AttendancePage from './components/AttendancePage';
// css

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AttendancePage />
        <Outlet /> {/* Render nested routes */}
      </Router>
    </div>
  );
}

export default App;