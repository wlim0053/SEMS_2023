import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { Box, Button, FormControl, FormLabel, FormErrorMessage, Select, Image, Heading } from "@chakra-ui/react";

const RegisterPageSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  studentId: Yup.string().required("Required"),
  enrolmentYear: Yup.string().required("Required"),
  enrolmentIntake: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  discipline: Yup.string().required("Required"),
});

const RegisterPage: React.FC = () => {
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
      <Formik
        initialValues={{
          name: "",
          email: "",
          studentId: "",
          enrolmentYear: "",
          enrolmentIntake: "",
          gender: "",
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
            <FormControl isRequired>
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
            {/* Repeat the FormControl block for each of your form fields, e.g. email, studentId, etc. */}
            {/* Just replace the 'name' prop with the appropriate field name */}
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
