// hooks
import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// components
import LoginPage from './components/LoginPage';

const App = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>Logged in successfully!</div>
      )}
    </>
  );
};

export default App;