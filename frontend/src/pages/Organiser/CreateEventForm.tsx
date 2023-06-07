import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Box, Heading, FormControl, FormLabel, Input, Stack, Checkbox, Button } from '@chakra-ui/react';

const initialValues = {
  eventID: '',
  club: '',
  clubName: '',
  email: '',
  personInCharge: '',
  contactNumber: '',
  collaboration: false,
};
type FormValues = {
  eventID: string;
  club: string;
  clubName: string;
  email: string;
  personInCharge: string;
  contactNumber: string;
  collaboration: boolean;
};


const clubNameIsRequired = (val: string | undefined) => val === 'Other';

const validationSchema = Yup.object().shape({
  eventID: Yup.string().required('Event ID is required'),
  club: Yup.string().required('Club is required'),
  clubName: Yup.string().test('isRequired', 'Club name is required', function (value) {
    const clubFieldValue = this.resolve(Yup.ref('club'));
    if (clubFieldValue === 'Other') {
      return value ? true : this.createError({ message: 'Club name is required' });
    }
    return true;
  }),
  email: Yup.string().email('Invalid email address').required('Email address is required'),
  personInCharge: Yup.string().required('Person in charge name is required'),
  contactNumber: Yup.string()
    .matches(/^\+60\d+$/, 'Contact number must start with +60 and contain only digits')
    .required('Contact number is required'),
});



const clubs = [
  { value: 'SoIT', label: 'SoIT' },
  { value: 'MUMTEC', label: 'MUMTEC' },
  { value: 'GDSC', label: 'GDSC' },
  { value: 'Wired', label: 'Wired' },
];

const OrganizerForm = () => {
  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Organizer Details
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values); // Handle form submission here
        }}
      >
        <Form>
          <FormControl mb={4}>
            <FormLabel>1. Event-ID</FormLabel>
            <Field as={Input} name="eventID" placeholder="Format: S - SoIT, M - MUMTEC, G - GDSC, W - Wired (e.g. S-003-2022)" />
            <ErrorMessage name="eventID" component="div" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>2. Name of Club/Team</FormLabel>
            <Stack spacing={1} ml={2}>
              {clubs.map((clubOption) => (
                <Field key={clubOption.value} type="radio" name="club" value={clubOption.value} as={Checkbox} ml={2} mt={1}>
                  {clubOption.label}
                </Field>
              ))}
              <Field type="radio" name="club" value="Other" as={Checkbox} ml={2} mt={1}>
                Other
              </Field>
              <Field name="clubName">
                {({ form }: { form: FormikProps<FormValues> }) => (
                  <>
                    {form.values.club === 'Other' ? (
                      <Input
                        name="clubName"
                        mt={2}
                        placeholder="Enter club name"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        value={form.values.clubName}
                      />
                    ) : null}
                  </>
                )}
              </Field>

            </Stack>

          </FormControl>

          <FormControl mb={4}>
            <FormLabel>3. Organizing Club's email address</FormLabel>
            <Field as={Input} name="email" type="email" placeholder="Enter email address" />
            <ErrorMessage name="email" component="div" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>4. Name of Person in charge</FormLabel>
            <Field as={Input} name="personInCharge" placeholder="Enter name" />
            <ErrorMessage name="personInCharge" component="div" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>5. Contact number of person in charge</FormLabel>
            <Field as={Input} name="contactNumber" placeholder="Enter contact number" />
            <ErrorMessage name="contactNumber" component="div" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>6. Is this event held in collaboration with another club/team/institution?</FormLabel>
            <Field type="checkbox" name="collaboration" as={Checkbox}>
              Yes
            </Field>
          </FormControl>

          <Button type="submit" colorScheme="blue" mt={4}>
            Next
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default OrganizerForm;
