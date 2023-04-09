// hooks
import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// components
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <ChakraProvider>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>Logged in successfully!</div>
      )}
    </ChakraProvider>
  );
};

export default App;