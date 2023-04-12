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
Image,
Center,
} from '@chakra-ui/react';

// Interface for LoginProps containing a function that gets called on successful login
interface LoginProps {
onLoginSuccess: () => void;
}

// LoginPage functional component
const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
// State for email input
const [email, setEmail] = useState('');
// State for password input
const [password, setPassword] = useState('');
// Hook to create toast notifications
const toast = useToast();

// Function to handle form submission
const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Show toast notification with a welcome message
    toast({
    title: 'Logged In',
    description: `Welcome, ${email}`,
    status: 'success',
    duration: 3000,
    isClosable: true,
    });
    // Call the onLoginSuccess function passed as a prop
    onLoginSuccess();
};

// Render the login form
return (
    <Box width="100%" maxWidth="400px" margin="0 auto" mt="100px">
        <Center mb={4}>
            <Image
                src="https://media.discordapp.net/attachments/950381894187483173/1003982545299439778/2016-MonashUniversityMALAYSIA_2-MonoCMYKoutlines.png?width=653&height=378"
                alt="Monash University Logo"
            />
        </Center>
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