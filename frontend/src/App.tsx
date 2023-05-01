// hooks
import React from "react";
// components
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
// css
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentHome from "./pages/StudentHome";
import EventHome from "./pages/EventHome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Admin />
              </>
            }
          />
          <Route path="/StudentHome" element={<StudentHome />} />
          <Route path="/EventHome" element={<EventHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
