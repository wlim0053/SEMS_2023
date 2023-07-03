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

interface ClubOption {
  value: string;
  label: string;
}

interface ActivityAssessment {
  [key: string]: boolean;
}

const clubs: ClubOption[] = [
  { value: "MUMTEC", label: "MUMTEC" },
  { value: "MUSA SoIT", label: "MUSA SoIT" },
  { value: "GDSC", label: "GDSC" },
  { value: "WIRED", label: "WIRED" },
];

interface EMSForm1Props {
  next: (newData: Partial<Data>, final?: boolean, skipTo?: number) => void;
  data: Data; // Update the type of data here
}

interface Data {
  eventID: string;
  organizerClub: string | ClubOption;
  organizerEmail: string;
  organizerPersonInCharge: string;
  organizerContactNumber: string;
  collaboration: boolean;
  collaboratorClub: string[];
  collaboratorEmail: string;
  collaboratorPersonInCharge: string;
  collaboratorContactNumber: string;
  eventName: string;
  eventObjective: string;
  attendees: number;
  selectedEventCategories: string[];
  eventCategoryOther: string;
  activityAssessment: ActivityAssessment;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  recurringEvent: boolean;
  eventFrequency: string;
  eventProposal: File | null;
  remarks: string;
  eventMode: "Physical" | "Virtual" | "";
  // ...
}

const EMSForm1: React.FC<EMSForm1Props> = (props) => {
  const handleNextStep = (values: Data) => {
    console.log("Form Data:", values);

    const skipTo = values.collaboration ? 1 : 2;
    const updatedValues = {
      ...values,
      collaboration: values.collaboration || false,
    };

    props.next(updatedValues, false, skipTo);
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Organizer Details
      </Heading>

      <Formik
        initialValues={props.data}
        onSubmit={(values) => {
          handleNextStep(values);
        }}
      >
        {() => (
          <Form>
            <FormControl mb={4}>
              <FormLabel>1. Event-ID</FormLabel>
              <Field
                as={Input}
                name="eventID"
                placeholder="Format: S - SoIT, M - MUMTEC, G - GDSC, W - Wired (e.g. S-003-2022)"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>2. Name of Club/Team</FormLabel>
              <Field name="organizerClub">
                {({ field, form }: FieldProps<any>) => (
                  <VStack spacing={2} alignItems="flex-start">
                    {clubs.map((clubOption) => (
                      <Checkbox
                        key={clubOption.value}
                        isChecked={field.value === clubOption.value}
                        onChange={() => {
                          if (field.value === clubOption.value) {
                            form.setFieldValue(field.name, "");
                          } else {
                            form.setFieldValue(field.name, clubOption.value);
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
              <FormLabel>3. Organizing Club's email address</FormLabel>
              <Field
                as={Input}
                name="organizerEmail"
                type="email"
                placeholder="Enter email address"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>4. Name of Person in charge</FormLabel>
              <Field
                as={Input}
                name="organizerPersonInCharge"
                placeholder="Enter name"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>5. Contact number of person in charge</FormLabel>
              <Field
                as={Input}
                name="organizerContactNumber"
                placeholder="Enter contact number"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                6. Is this event held in collaboration with another
                club/team/institution?
              </FormLabel>
              <Field name="collaboration">
                {({ field }: FieldProps<any>) => (
                  <Checkbox
                    isChecked={field.value}
                    onChange={() =>
                      field.onChange({
                        target: {
                          name: field.name,
                          value: !field.value,
                        },
                      })
                    }
                  >
                    Yes
                  </Checkbox>
                )}
              </Field>
            </FormControl>

            <Button type="submit" colorScheme="blue" mt={4}>
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EMSForm1;
