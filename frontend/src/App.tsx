// hooks
import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// components
import LoginPage from './components/LoginPage';
import AttendancePage from './components/AttendancePage';

// App functional component
const App = () => {
    // State to track whether the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Function to handle a successful login
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

  // Render the app
  return (
    <>
      <AttendancePage />
    </>
  );
};

export default App;