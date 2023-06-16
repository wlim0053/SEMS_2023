import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Image, Heading, Select } from "@chakra-ui/react";
import axios from 'axios';

interface RegisterPageFormData {
  firstName: string;
  lastName: string;
  studentId: string;
  enrolmentYear: string;
  enrolmentIntake: string;
  gender: string;
  discipline: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterPageFormData>({
    firstName: "",
    lastName: "",
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
    for( var key in formData ) {
      if( key === "" ) {
        alert("Please fill in all fields!");
        return;
      }
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const body = {
      "stu_fire_id": user.uid,
      "stu_email": user.email,
      "stu_name": formData.firstName, //TODO: change to first name and last name
      "stu_id": formData.studentId,
      "enrolment_year": formData.enrolmentYear,
      "enrolment_intake": formData.enrolmentIntake,
      "stu_gender": formData.gender,
      "dis_uuid": formData.discipline,
  }

    console.log(body);
    async function doPostRequest() {

      let payload = body;

      console.log(payload);
  
      let res = await axios.post('http://localhost:3000/api/user', payload);
  
      let data = res.data;
      console.log(data);
      console.log("POST Request sent")
  }
    // doPostRequest();
  };


// we have an array
const discArray = [{ key: "Chemical", value: "C" }, { key: "Mechanical", value: "M" }, { key: "Electrical", value: "E"}, { key: "Software", value: "S"}];

// call the function we made. more readable
const discOptions = discArray.map((discItem) => 
  <option value={discItem.value}>{discItem.key}</option>
);


  // const generateDropDown = () => {
  //   const options = [{ key: "Chemical", value: "C" }, { key: "Mechanical", value: "M" }, { key: "Electrical", value: "E"}];
  //   return options.map((option) => {
  //      <option value={option.value}>{option.key}</option>;
  //   });

    
  // };

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
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Student ID</FormLabel>
          <Input
            type="number"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Enrolment Year</FormLabel>
          <Input
            type="number"
            name="enrolmentYear"
            placeholder="Enrolment Year"
            value={formData.enrolmentYear}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Enrolment Intake</FormLabel>
          <Select name="enrolmentIntake" value={formData.enrolmentIntake} onChange={handleInputChange}>
            <option value="2">February</option>
            <option value="7">July</option>
            <option value="10">October</option>
          </Select>
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Gender</FormLabel>
          <Select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="0">Female</option>
            <option value="1">Male</option>
          </Select>
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Discipline</FormLabel>
          <Select name="discipline" value={formData.discipline} onChange={handleInputChange}>
            {/* <option value="Chemical">Chemical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option> */}
            {discOptions}
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