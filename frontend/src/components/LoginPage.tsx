// LoginPage.tsx
import React, { useState, FormEvent } from 'react';
import {
  Box,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Logged In',
      description: `Welcome, ${email}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onLoginSuccess();
  };

  return (
    <Box width="100%" maxWidth="400px" margin="0 auto" mt="100px">
      <VStack
        as="form"
        onSubmit={handleSubmit}
        alignItems="stretch"
        spacing={4}
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
          Login
        </Text>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
