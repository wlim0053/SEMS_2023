import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Image, Heading } from "@chakra-ui/react";

// Define the shape of the form data for TypeScript
interface RegisterPageFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// The RegisterPage component
const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterPageFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Event handler for input changes. Updates the form data state.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Event handler for form submission. Prevents default form submission event.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission logic here
  };

  // Render the form
  return (
    <Box p={5}>
      <Box textAlign="center" mb={5}>
        <Image
          src="https://media.discordapp.net/attachments/950381894187483173/1003982545299439778/2016-MonashUniversityMALAYSIA_2-MonoCMYKoutlines.png?width=653&height=378"
          height="200"
          width="400"
          className="d-inline-block align-top"
          alt="Logo"
        />
        <Heading>Register</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full" mt={6}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;