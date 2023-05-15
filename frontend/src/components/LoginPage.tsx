// LoginPage.tsx
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import './firebase-config';
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

const auth = getAuth();
const provider = new GoogleAuthProvider()

const loginWithGoogle= () =>{

    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    console.log(user.uid);
    console.log(user.reloadUserInfo.displayName)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).then((response)=>{console.log(response)})
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
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
            <Button colorScheme="blue" mt={4} leftIcon={<EmailIcon/>} onClick={loginWithGoogle}>
            Login
            </Button>
        </VStack>
    </Box>
);
};

export default LoginPage;