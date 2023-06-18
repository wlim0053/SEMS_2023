import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
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
import { ChevronLeftIcon } from "@chakra-ui/icons";

interface ClubOption {
  value: string;
  label: string;
}

const clubs: ClubOption[] = [
  { value: "MUMTEC", label: "MUMTEC" },
  { value: "MUSA SoIT", label: "MUSA SoIT" },
  { value: "GDSC", label: "GDSC" },
  { value: "WIRED", label: "WIRED" },
];

interface EMSForm2Props {
  data: {
    collaboratorClub: string[];
    collaboratorEmail: string;
    collaboratorPersonInCharge: string;
    collaboratorContactNumber: string;
  };
  next: (values: any) => void;
  prev: (values: any) => void;
}

const EMSForm2: React.FC<EMSForm2Props> = (props) => {
  const handleNextStep = (values: Data) => {
    console.log("Form Data:", values);

    const skipTo = values.collaboration ? 1 : 2;
    const updatedValues = {
      ...values,
      collaboration: values.collaboration || false,
    };

    props.next(updatedValues, false, skipTo);
  };
  const handleNextStep = (values: any) => {
    props.next(values);
  };

  const handlePrevStep = () => {
    props.prev({
      collaboratorClub: [], // Reset the collaboratorClub field
      collaboratorEmail: "",
      collaboratorPersonInCharge: "",
      collaboratorContactNumber: "",
    });
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Collaborators Details
      </Heading>

      <Button
        variant="unstyled"
        _hover={{ textDecoration: "none" }}
        alignItems="center"
        onClick={handlePrevStep}
        mt={4}
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

      <Formik initialValues={props.data} onSubmit={handleNextStep}>
        {() => (
          <Form>
            <FormControl mb={4}>
              <FormLabel>1. Name of Club/Team</FormLabel>
              <Field name="collaboratorClub">
                {({ field }: FieldProps<any>) => (
                  <VStack spacing={2} alignItems="flex-start">
                    {clubs.map((clubOption) => (
                      <Checkbox
                        key={clubOption.value}
                        isChecked={field.value.includes(clubOption.value)}
                        onChange={() => {
                          if (field.value.includes(clubOption.value)) {
                            const nextValue = field.value.filter(
                              (value: string) => value !== clubOption.value
                            );
                            field.onChange({
                              target: {
                                name: field.name,
                                value: nextValue,
                              },
                            });
                          } else {
                            const nextValue = [
                              ...field.value,
                              clubOption.value,
                            ];
                            field.onChange({
                              target: {
                                name: field.name,
                                value: nextValue,
                              },
                            });
                          }
                        }}
                      >
                        {clubOption.label}
                      </Checkbox>
                    ))}
                  </VStack>
                )}
              </Field>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>2. Club's email address</FormLabel>
              <Field
                as={Input}
                name="collaboratorEmail"
                type="email"
                placeholder="Enter email address"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>3. Name of Person in charge</FormLabel>
              <Field
                as={Input}
                name="collaboratorPersonInCharge"
                placeholder="Enter name"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>4. Contact number</FormLabel>
              <Field
                as={Input}
                name="collaboratorContactNumber"
                placeholder="Enter contact number"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" mt={4}>
              Next Page
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EMSForm2;
