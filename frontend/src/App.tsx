// hooks
// components
import Navbar from './components/Navbar'
// css
import './App.css'
import { BrowserRouter as Router, Outlet } from "react-router-dom";
// css

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