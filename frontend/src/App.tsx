// hooks
import { useState } from "react";
// components
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
// css
import "./App.css";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>

      <FeedbackForm />
    </div>
  );
}

export default App;
