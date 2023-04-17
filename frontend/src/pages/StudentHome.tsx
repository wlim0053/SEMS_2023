// stub code
import Navbar from "../components/Navbar";
import React from "react";
import Calendar from "../components/Calendar";
import CountdownTimer from "../components/CountdownTimer";

function StudentHome() {
  return (
    <div>
      <Navbar />
      <CountdownTimer />
      <Calendar />
    </div>
  );
}

export default StudentHome;
