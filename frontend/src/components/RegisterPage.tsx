import React from "react";
import * as Yup from "yup";
import { Divider } from "@chakra-ui/react";
import { Formik, Field, useFormikContext } from "formik";
import { Box, Button, Container, FormControl, FormLabel, FormErrorMessage, Select, Image, Heading } from "@chakra-ui/react";


const RegisterPageSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  studentId: Yup.string().required("Required"),
  enrolmentYear: Yup.string().required("Required"),
  enrolmentIntake: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  school: Yup.string().required("Required"),
  discipline: Yup.string().when('school', {
    is: 'Engineering',
    then: Yup.string().required("Required"),
    otherwise: Yup.string().notRequired(),
  }),
});

const DisciplineSelect = () => {
  const { values } = useFormikContext();
  return values.school === 'Engineering' ? (
    <FormControl isRequired mb={4}>
      <FormLabel>Discipline</FormLabel>
      <Field as={Select} name="discipline">
        <option value="">Select discipline</option>
        <option value="Chemical">Chemical</option>
        <option value="Mechanical">Mechanical</option>
        <option value="Electrical">Electrical</option>
      </Field>
      <FormErrorMessage>{values.errors?.discipline}</FormErrorMessage>
    </FormControl>
  ) : null;
};

const RegisterPage: React.FC = () => {
  return (
    <Box p={5} maxW="800px" margin="auto">
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
      <Formik
        initialValues={{
          name: "",
          email: "",
          studentId: "",
          enrolmentYear: "",
          enrolmentIntake: "",
          gender: "",
          school: "",
          discipline: "",
        }}
        validationSchema={RegisterPageSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            console.log(values);
            // Here you would typically handle the form values, e.g. send them to an API
          }, 400);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb={4} width="full">
              <FormLabel>Name</FormLabel>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Student ID</FormLabel>
              <Field
                type="text"
                name="studentId"
                placeholder="Student ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.studentId}
              />
              <FormErrorMessage>{errors.studentId}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Enrolment Year</FormLabel>
              <Field as={Select} name="enrolmentYear">
                <option value="">Select Year</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </Field>
              <FormErrorMessage>{errors.enrolmentYear}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Enrolment Intake</FormLabel>
              <Field as={Select} name="enrolmentIntake">
                <option value="">Select Intake</option>
                <option value="February">February</option>
                <option value="July">July</option>
                <option value="October">October</option>
              </Field>
              <FormErrorMessage>{errors.enrolmentIntake}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Gender</FormLabel>
              <Field as={Select} name="gender">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <FormErrorMessage>{errors.gender}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>School</FormLabel>
              <Field as={Select} name="school" onChange={handleChange}>
                <option value="">Select School</option>
                <option value="Business">Business</option>
                <option value="IT">IT</option>
                <option value="Engineering">Engineering</option>
              </Field>
              <FormErrorMessage>{errors.school}</FormErrorMessage>
            </FormControl>
            <DisciplineSelect />
            <Button
              bg="#006DAE"
              color="white"
              h="60px"
              type="submit"
              width="full"
              mt={6}
              disabled={isSubmitting}
            >
              Register
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterPage;