import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Divider,
  Image,
  Heading,
  Select,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const engineeringSchool = "School of Engineering";

const RegisterPageSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  studentId: Yup.string().required("Required"),
  enrolmentYear: Yup.string().required("Required"),
  enrolmentIntake: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  school: Yup.string().required("Required"),
  discipline: Yup.string().required("Required"),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [specialise, setSpecialise] = useState<Object[] | null>(null);
  const [schoolType, setSchoolType] = useState<string | null>(null);
  const [schools, setSchools] = useState<Object[] | null>(null);

  // useEffect(() => {
  //   // Assume you have an endpoint /schools to fetch the list of schools
  //   api
  //     .get("/schools")
  //     .then((response) => {
  //       setSchools(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (schoolType === "Engineering") {
  //     // or whatever value represents the School of Engineering
  //     // Perform your API call here
  //     api.get("/specialisation").then((response) => {
  //       setSpecialise(response.data);
  //     });
  //   } else {
  //     setSpecialise(null);
  //   }
  // }, [schoolType]);

  // useEffect(() => {
  //   // Perform your API call here
  //   api.get("/specialisation").then((response) => {
  //     setSpecialise(response.data);
  //   });
  // }, []); // Empty dependency array to ensure the effect runs only once on component mount

  // Fetches data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.get("/school").then((response) => {
          setSchools(response.data);
        });
        await api.get("/specialisation").then((response) => {
          setSpecialise(response.data);
        });
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };
    fetchData();
  }, []);

  async function doPostRequest(body: Object) {
    try {
      let payload = body;
      let res = await api.post("/user/register", payload);
      let data = res.data;
      console.log(data);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  return (
    <>
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
            firstName: "",
            lastName: "",
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
              const user = JSON.parse(localStorage.getItem("RegUser") || "{}");
              const body = {
                user_fire_id: user.uid,
                spec_uuid: values.discipline,
                user_email: user.email,
                user_fname: values.firstName,
                user_lname: values.lastName,
                user_id: parseInt(values.studentId),
                user_gender: parseInt(values.gender),
                enrolment_year: new Date(values.enrolmentYear).toISOString(),
                enrolment_intake: parseInt(values.enrolmentIntake),
                user_access_lvl: "S",
              };

              doPostRequest(body);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Type here, e.g. John"
                  as={Input}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Last Name</FormLabel>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Type here, e.g. Walter"
                  as={Input}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Student ID</FormLabel>
                <Field
                  type="number"
                  name="studentId"
                  placeholder="Type here, e.g. 32706139"
                  as={Input}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.studentId}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Enrolment Year</FormLabel>
                <Field
                  type="number"
                  name="enrolmentYear"
                  placeholder="Type here, e.g. 2021"
                  as={Input}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.enrolmentYear}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Gender</FormLabel>
                <Field
                  as="select"
                  name="gender"
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="0" key="Female">
                    Female
                  </option>
                  <option value="1" key="Male">
                    Male
                  </option>
                </Field>
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              </FormControl>
              <Divider my={1} />
              <FormControl isRequired mt={6}>
                <FormLabel>School</FormLabel>
                <Field
                  as="select"
                  name="school"
                  // onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  //   setSchoolType(e.target.value)
                  // }

                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {schools ? (
                    schools.map((schoolItem: any) => (
                      <option
                        value={schoolItem.uuid}
                        key={schoolItem.school_name}
                      >
                        {schoolItem.school_name}
                      </option>
                    ))
                  ) : (
                    <option value="0" key="Loading">
                      Loading...
                    </option>
                  )}
                </Field>
                <FormErrorMessage>{errors.school}</FormErrorMessage>
              </FormControl>
              {values.school === engineeringSchool && ( // or whatever value represents the School of Engineering
                <FormControl isRequired mt={6}>
                  <FormLabel>Discipline</FormLabel>
                  <Field
                    as="select"
                    name="discipline"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {specialise ? (
                      specialise.map((specialisationItem: any) => (
                        <option
                          value={specialisationItem.spec_uuid}
                          key={specialisationItem.spec_name}
                        >
                          {specialisationItem.spec_name}
                        </option>
                      ))
                    ) : (
                      <option value="0" key="Loading">
                        Loading...
                      </option>
                    )}
                  </Field>
                  <FormErrorMessage>{errors.discipline}</FormErrorMessage>
                </FormControl>
              )}
              <Divider my={1} />
              {/* <FormControl isRequired mt={6}>
              <FormLabel>Discipline</FormLabel>
              <Field
                as="select"
                name="discipline"
                errors={errors}
                touched={touched}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                {specialise ? (
                  specialise.map((specialisationItem: any) => (
                    <option
                      value={specialisationItem.spec_uuid}
                      key={specialisationItem.spec_name}
                    >
                      {specialisationItem.spec_name}
                    </option>
                  ))
                ) : (
                  <option value="0" key="Loading">
                    Loading...
                  </option>
                )}
              </Field>
              <FormErrorMessage>{errors.discipline}</FormErrorMessage>
            </FormControl> */}
              {/* <Divider my={1} /> */}
              <Button
                bg="#006DAE"
                color="white"
                h="60px"
                width="full"
                mt={6}
                type="submit"
                disabled={isSubmitting}
              >
                Register
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default RegisterPage;
