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
import { EmailIcon } from '@chakra-ui/icons';


interface LoginProps {
onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
const toast = useToast();
const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({
    title: 'Logged In',
    description: `Welcome`,
    status: 'success',
    duration: 3000,
    isClosable: true,
    });
    onLoginSuccess();
};

return (
    <Box width="100%" maxWidth="400px" margin="0 auto" mt="100px">
        {/* <Center mb={4}>
        </Center> */}
        <VStack>
            <Image
                src="https://media.discordapp.net/attachments/950381894187483173/1003982545299439778/2016-MonashUniversityMALAYSIA_2-MonoCMYKoutlines.png?width=653&height=378"
                alt="Monash University Logo"
            />
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
                Login
            </Text>
            <Button colorScheme="blue" mt={4} leftIcon={<EmailIcon/>}>
            Login
            </Button>
        </VStack>
    </Box>
);
};

export default LoginPage;