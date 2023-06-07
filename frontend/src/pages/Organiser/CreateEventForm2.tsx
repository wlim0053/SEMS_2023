import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Text,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Tooltip,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { InfoIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const Page2 = () => {
  const initialValues = {
    clubs: [],
    otherClub: "",
    email: "",
    personInCharge: "",
    contactNumber: "",
  };

  const handleBackButtonClick = () => {
    window.location.href = "/CreateEventForm";
  };

  const handleButtonClick = () => {
    window.location.href = "/CreateEventForm3";
  };

  const handleSubmit = (values: any) => {
    // Handle form submission
    console.log("Form submitted:", values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <Box p={4}>
            <Button
              variant="unstyled"
              _hover={{ textDecoration: "none" }}
              alignItems="center"
              onClick={handleBackButtonClick}
            >
              <Icon
                as={ChevronLeftIcon}
                display="inline-block"
                mb={1}
                color="gray.400"
              />
              <Text display="inline-block" color="gray.400">
                Back
              </Text>
            </Button>

            <Heading as="h2" mb={4}>
              Collaborators Details
            </Heading>

            <FormControl mb={4}>
              <FormLabel>
                1. Name of Club/Team
                <Tooltip
                  label="If you are collaborating with an institution outside of Monash University Malaysia, please indicate so by selecting 'Other' and stating the name of the institution."
                  placement="right-end"
                >
                  <InfoIcon ml={2} color="gray.500" boxSize={4} />
                </Tooltip>
              </FormLabel>
              <VStack align="start" spacing={2}>
                <Checkbox
                  isChecked={values.clubs.includes("MUMTEC")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const isChecked = e.target.checked;
                    const club = "MUMTEC";
                    handleChange(e);
                    if (isChecked) {
                      handleChange({
                        target: {
                          name: "clubs",
                          value: [...values.clubs, club],
                        },
                      });
                    } else {
                      handleChange({
                        target: {
                          name: "clubs",
                          value: values.clubs.filter((c) => c !== club),
                        },
                      });
                    }
                  }}
                  name="clubs"
                  value="MUMTEC"
                >
                  MUMTEC
                </Checkbox>

                <Checkbox
                  isChecked={values.clubs.includes("MUSA SoIT")}
                  onChange={handleChange}
                  name="clubs"
                  value="MUSA SoIT"
                >
                  MUSA SoIT
                </Checkbox>
                <Checkbox
                  isChecked={values.clubs.includes("GDSC")}
                  onChange={handleChange}
                  name="clubs"
                  value="GDSC"
                >
                  GDSC
                </Checkbox>
                <Checkbox
                  isChecked={values.clubs.includes("WIRED")}
                  onChange={handleChange}
                  name="clubs"
                  value="WIRED"
                >
                  WIRED
                </Checkbox>
                <Checkbox
                  isChecked={values.clubs.includes("Other")}
                  onChange={handleChange}
                  name="clubs"
                  value="Other"
                >
                  Other
                </Checkbox>
                {values.clubs.includes("Other") && (
                  <Input
                    value={values.otherClub}
                    onChange={handleChange}
                    name="otherClub"
                    placeholder="Enter other club/team name"
                  />
                )}
              </VStack>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                2. Club's email address
                <Tooltip
                  label="Please provide the email address associated with the club/team."
                  placement="right-end"
                >
                  <InfoIcon ml={2} color="gray.500" boxSize={4} />
                </Tooltip>
              </FormLabel>
              <Field
                as={Input}
                type="email"
                name="email"
                placeholder="Enter email address"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                3. Name of Person in charge
                <Tooltip
                  label="Please provide the name of the person who is in charge of the club/team."
                  placement="right-end"
                >
                  <InfoIcon ml={2} color="gray.500" boxSize={4} />
                </Tooltip>
              </FormLabel>
              <Field
                as={Input}
                name="personInCharge"
                placeholder="Enter name"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                4. Contact number
                <Tooltip
                  label="Please include the country code."
                  placement="right-end"
                >
                  <InfoIcon ml={2} color="gray.500" boxSize={4} />
                </Tooltip>
              </FormLabel>
              <Field
                as={Input}
                name="contactNumber"
                placeholder="Enter contact number"
              />
            </FormControl>

            <Button onClick={handleButtonClick} colorScheme="blue" mt={4}>
              Next Page
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Page2;
