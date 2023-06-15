import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Image, Heading, Select } from "@chakra-ui/react";

interface RegisterPageFormData {
  name: string;
  email: string;
  studentId: string;
  enrolmentYear: string;
  enrolmentIntake: string;
  gender: string;
  discipline: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterPageFormData>({
    name: "",
    email: "",
    studentId: "",
    enrolmentYear: "",
    enrolmentIntake: "",
    gender: "",
    discipline: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData.discipline);
  };

  return (
    <Box p={5}>
      <Box textAlign="center" mb={5}>
        <Image
          src="https://media.discordapp.net/attachments/950381894187483173/1003982545299439778/2016-MonashUniversityMALAYSIA_2-MonoCMYKoutlines.png?width=653&height=378"
          height="200"
          width="400"
          className="d-inline-block align-top"
          alt="Logo"
          mx="auto"
        />
        <Heading>Register</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
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
          <FormLabel>Student ID</FormLabel>
          <Input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Enrolment Year</FormLabel>
          <Select name="enrolmentYear" value={formData.enrolmentYear} onChange={handleInputChange}>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </Select>
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Enrolment Intake</FormLabel>
          <Select name="enrolmentIntake" value={formData.enrolmentIntake} onChange={handleInputChange}>
            <option value="February">January</option>
            <option value="July">February</option>
            <option value="October">March</option>
          </Select>
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Gender</FormLabel>
          <Select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </Select>
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Discipline</FormLabel>
          <Select name="discipline" value={formData.discipline} onChange={handleInputChange}>
            <option value="Chemical">Chemical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
          </Select>
        </FormControl>
        <Button
          bg="#006DAE"
          color="white"
          h="60px"
          type="submit"
          width="full"
          mt={6}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;