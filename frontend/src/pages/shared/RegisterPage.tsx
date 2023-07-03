import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Image, Heading, Select } from "@chakra-ui/react";
import api from '../../utils/api';
import { s } from "@fullcalendar/core/internal-common";
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterPageFormData>({
    firstName: "",
    lastName: "",
    studentId: "",
    enrolmentYear: "",
    enrolmentIntake: "",
    gender: "",
    discipline: "",
  });
  const[specialise, setSpecialise] = useState<Object[] | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit")
    for( var key in formData ) {
      if( key === "" ) {
        alert("Please fill in all fields!");
        return;
      }
    }


    const user = JSON.parse(localStorage.getItem('RegUser') || '{}');
    const body = {
      "user_fire_id": user.uid,
      "spec_uuid": formData.discipline,
      "user_email": user.email,
      "user_fname": formData.firstName,
      "user_lname": formData.lastName,
      "user_id": parseInt(formData.studentId),
      "user_gender": parseInt(formData.gender),
      "enrolment_year": new Date(formData.enrolmentYear).toISOString(),
      "enrolment_intake": parseInt(formData.enrolmentIntake),
      "user_access_lvl": "S"
  }

    console.log(body);
    async function doPostRequest() {

      let payload = body;

      console.log(payload);
  
      let res = await api.post('/user/register', payload);
  
      let data = res.data;
      console.log(data);
      console.log("POST Request sent")
  }
    doPostRequest();

    // async function doPostRequest2() {
    //   let payload = { user_fire_id: user.uid};

    //   let res = await api.post('/user/login', payload);
    //   let data = res.data;
    //   console.log(data);
    //   console.log("POST Request sent")
    // }
    // doPostRequest2();
  };


useEffect(() => {
  // Perform your API call here
  api.get('/specialisation')
  .then((response) => {setSpecialise(response.data)})
  // .then(special => console.log(specialise));
}, []); // Empty dependency array to ensure the effect runs only once on component mount

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
            <option value="2" key="February">February</option>
            <option value="7" key="July">July</option>
            <option value="10" key="October">October</option>
          </Select>
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Gender</FormLabel>
          <Select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="0" key="Female">Female</option>
            <option value="1" key="Male">Male</option>
          </Select>
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Discipline</FormLabel>
          <Select name="discipline" value={formData.discipline} onChange={handleInputChange}>
            {specialise ? specialise.map((specialisationItem: any) =>
              <option value={specialisationItem.spec_uuid} key={specialisationItem.spec_name}>{specialisationItem.spec_name}</option>
            ): <option value="0" key="Loading">Loading...</option>}

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