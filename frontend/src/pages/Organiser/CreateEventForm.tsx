import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Stack,
  Button,
  Grid,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { color } from "framer-motion";
const clubOptions = [
  "MUMEC",
  "MUSA SoE",
  "EAMMSS",
  "EWB",
  "ICE",
  "ICHEME",
  "IEMMSS",
  "IEEE",
  "IMECHE",
  "MWE",
  "RMM",
  "RBC",
  "ChemECar",
  "FSAE",
  "SEM",
  "ROBOCLUB",
  "MUSA SoIT",
  "MUMTEC",
  "GDSC",
  "WIRED",
];

const validationSchema = yup.object().shape({
  eventTitle: yup.string().required("Event Title is required"),
  venueLink: yup.string().required("Venue Link is required"),
  description: yup.string().required("Description is required"),
  checkedBox: yup.string().required("Please fill the EMS form"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .positive("Capacity must be a positive number"),
  club: yup.string().required("Club is required"),
  semester: yup.string().required("Semester is required"),
  organiserEmail: yup
    .string()
    .email("Invalid Organiser Email")
    .required("Organiser Email is required"),
  eventStart: yup
    .date()
    .required("Event Start Date and Time are required")
    .min(
      yup.ref("registrationEnd"),
      "Event Start must be after Registration End"
    )
    .max(yup.ref("eventEnd"), "Event Start must be before Event End"),
  eventEnd: yup
    .date()
    .required("Event End Date and Time are required")
    .min(yup.ref("eventStart"), "Event End must be after Event Start"),
  registrationStart: yup
    .date()
    .required("Registration Start Date and Time are required")
    .max(
      yup.ref("registrationEnd"),
      "Registration Start must be before Registration End"
    ),
  registrationEnd: yup
    .date()
    .required("Registration End Date and Time are required")
    .min(
      yup.ref("registrationStart"),
      "Registration End must be after Registration Start"
    )
    .max(yup.ref("eventStart"), "registrationEnd must be before Event Start"),
  signUpFormLink: yup
    .string()
    .required("Sign Up Form Link is required")
    .url("Invalid Sign Up Form Link"),
});

function CreateEventForm() {
  const [isChecked, setIsChecked] = useState(false);

  const formik = useFormik({
    initialValues: {
      eventTitle: "",
      venueLink: "",
      description: "",
      capacity: "",
      club: "",
      semester: "",
      organiserEmail: "",
      eventStart: null,
      eventEnd: null,
      registrationStart: null,
      registrationEnd: null,
      signUpFormLink: "",
      checkedBox: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(formik.values);
    },
  });

  // Function to handle checkbox change
  const handleCheckboxChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsChecked(e.target.checked);

  };

  const disableDatesBeforeToday = (date: Date) => {
    const today = new Date();
    return date > today;
  };

  const disableDatesBeforeRegistrationStart = (date: Date) => {
    return formik.values.registrationStart !== null
      ? date > (formik.values.registrationStart as Date)
      : true;
  };

  const disableDatesBeforeRegistrationEnd = (date: Date) => {
    return formik.values.registrationEnd !== null
      ? date > (formik.values.registrationEnd as Date)
      : true;
  };

  const disableDatesAfterRegistrationEnd = (date: Date) => {
    return formik.values.registrationEnd !== null
      ? date > (formik.values.registrationEnd as Date)
      : true;
  };

  const disableDatesBeforeEventStarts = (date: Date) => {
    return formik.values.eventStart !== null
      ? date >= (formik.values.eventStart as Date)
      : true;
  };

  const disableDatesAfterEventStarts = (date: Date) => {
    return formik.values.eventStart !== null
      ? date <= (formik.values.eventStart as Date)
      : true;
  };

  const disableDatesAfterEventEnd = (date: Date) => {
    return formik.values.eventEnd !== null
      ? date <= (formik.values.eventEnd as Date)
      : true;
  };


  return (

    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          mt={8}
          textAlign="center"
          color={"blue.600"}
        >
          Create Event
        </Text>
      </Box>


      <Stack spacing={6} width="900px" mx="auto" mb={12}>
        <Box>{/*Because Stack from Chakra UI refrains the first element from being moved, this box is a placeholder for ui aspect*/}</Box>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="left"
          marginLeft={0}
          mt={4}
          ml={"410px"}
          display="inline-block"
          color={"blue.600"}
        >
          Event Details
        </Text>
        {/* Event Title */}
        <FormControl>
          <FormLabel>Event Title</FormLabel>
          <Input
            id="eventTitle"
            name="eventTitle"
            type="text"
            value={formik.values.eventTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter event title"
          />
          {formik.touched.eventTitle && formik.errors.eventTitle && (
            <Text color="red">{formik.errors.eventTitle}</Text>
          )}
        </FormControl>

        {/* Venue Link */}
        <FormControl>
          <FormLabel>Venue Link</FormLabel>
          <Input
            id="venueLink"
            name="venueLink"
            type="text"
            value={formik.values.venueLink}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter venue link"
          />
          {formik.touched.venueLink && formik.errors.venueLink && (
            <Text color="red">{formik.errors.venueLink}</Text>
          )}
        </FormControl>

        {/* Description */}
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="md"
            resize="vertical"
            placeholder="Enter description"
          />
          {formik.touched.description && formik.errors.description && (
            <Text color="red">{formik.errors.description}</Text>
          )}
        </FormControl>

        {/* Capacity, Club, Semester, Organiser Email */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {/* Capacity */}
          <FormControl>
            <FormLabel>Capacity</FormLabel>
            <Input
              id="capacity"
              name="capacity"
              type="text"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter capacity"
            />
            {formik.touched.capacity && formik.errors.capacity && (
              <Text color="red">{formik.errors.capacity}</Text>
            )}
          </FormControl>

          {/* Club */}
          <FormControl>
            <FormLabel>Club</FormLabel>
            <Select
              id="club"
              name="club"
              value={formik.values.club}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Select Club"
            >
              {clubOptions.map((clubOption) => (
                <option key={clubOption} value={clubOption}>
                  {clubOption}
                </option>
              ))}
            </Select>
            {formik.touched.club && formik.errors.club && (
              <Text color="red">{formik.errors.club}</Text>
            )}
          </FormControl>

          {/* Semester */}
          <FormControl>
            <FormLabel>Semester</FormLabel>
            <Select
              id="semester"
              name="semester"
              value={formik.values.semester}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Select Semester"
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </Select>
            {formik.touched.semester && formik.errors.semester && (
              <Text color="red">{formik.errors.semester}</Text>
            )}
          </FormControl>

          {/* Organiser Email */}
          <FormControl>
            <FormLabel>Organiser Email</FormLabel>
            <Input
              id="organiserEmail"
              name="organiserEmail"
              type="email"
              value={formik.values.organiserEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter organiser email"
            />
            {formik.touched.organiserEmail &&
              formik.errors.organiserEmail && (
                <Text color="red">{formik.errors.organiserEmail}</Text>
              )}
          </FormControl>
        </Grid>

        <Divider />

        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="left"
          marginLeft={0}
          mt={4}
          ml={"410px"}
          display="inline-block"
          color={"blue.600"}
        >
          Date & Time
        </Text>

        {/* Event Start (Date and Time) */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <FormControl>
            <FormLabel>Event Start (Date and Time)</FormLabel>
            <DatePicker
              id="eventStart"
              name="eventStart"
              selected={formik.values.eventStart}
              onChange={(date: any) => formik.setFieldValue("eventStart", date)}
              onBlur={formik.handleBlur}
              showTimeInput
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              customInput={<Input />}
              filterDate={(date: any) =>
                disableDatesBeforeToday(date) &&
                disableDatesAfterRegistrationEnd(date) &&
                disableDatesAfterEventEnd(date)
              } // Disable dates before today and after event end
            />
            {formik.touched.eventStart && formik.errors.eventStart && (
              <Text color="red">{formik.errors.eventStart}</Text>
            )}
          </FormControl>

          {/* Event End (Date and Time) */}
          <FormControl>
            <FormLabel>Event End (Date and Time)</FormLabel>
            <DatePicker
              id="eventEnd"
              name="eventEnd"
              selected={formik.values.eventEnd}
              onChange={(date: any) => formik.setFieldValue("eventEnd", date)}
              onBlur={formik.handleBlur}
              showTimeInput
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              customInput={<Input />}
              filterDate={(date: any) =>
                disableDatesBeforeToday(date) &&
                disableDatesBeforeEventStarts(date) &&
                disableDatesBeforeRegistrationEnd(date) &&
                disableDatesBeforeRegistrationStart(date)
              }
            />
            {formik.touched.eventEnd && formik.errors.eventEnd && (
              <Text color="red">{formik.errors.eventEnd}</Text>
            )}
          </FormControl>

          {/* Registration Start (Date and Time) */}
          <FormControl>
            <FormLabel>Registration Start (Date and Time)</FormLabel>
            <DatePicker
              id="registrationStart"
              name="registrationStart"
              selected={formik.values.registrationStart}
              onChange={(date: any) =>
                formik.setFieldValue("registrationStart", date)
              }
              onBlur={formik.handleBlur}
              showTimeInput
              timeInputLabel="Time:"
              dateFormat="dd/MM/yyyy h:mm aa"
              customInput={<Input />}
              filterDate={(date: any) =>
                disableDatesBeforeToday(date) &&
                disableDatesAfterEventStarts(date)
              } // Disable dates before today and after event start
            />
            {formik.touched.registrationStart &&
              formik.errors.registrationStart && (
                <Text color="red">{formik.errors.registrationStart}</Text>
              )}
          </FormControl>

          {/* Registration End (Date and Time) */}
          <FormControl>
            <FormLabel>Registration End (Date and Time)</FormLabel>
            <DatePicker
              id="registrationEnd"
              name="registrationEnd"
              selected={formik.values.registrationEnd}
              onChange={(date: any) =>
                formik.setFieldValue("registrationEnd", date)
              }
              onBlur={formik.handleBlur}
              showTimeInput
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              customInput={<Input />}
              filterDate={(date: any) =>
                disableDatesBeforeRegistrationStart(date) &&
                disableDatesAfterEventStarts(date) &&
                disableDatesBeforeToday(date)
              } // Disable dates before registration start and after event start
            />
            {formik.touched.registrationEnd &&
              formik.errors.registrationEnd && (
                <Text color="red">{formik.errors.registrationEnd}</Text>
              )}
          </FormControl>
        </Grid>

        <Divider />

        {/* Sign Up Form Link */}
        <FormControl>
          <FormLabel>Sign Up Form Link</FormLabel>
          <Input
            id="signUpFormLink"
            name="signUpFormLink"
            type="text"
            value={formik.values.signUpFormLink}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter sign up form link"
          />
          {formik.touched.signUpFormLink && formik.errors.signUpFormLink && (
            <Text color="red">{formik.errors.signUpFormLink}</Text>
          )}
        </FormControl>

        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="left"
          marginLeft={0}
          mt={4}
          ml={"410px"}
          display="inline-block"
          color={"blue.600"}
        >
          EMS FORM
        </Text>
        <FormLabel>By submitting this form, you are acknowledging that your event plan is final and no changes can be made to said plan. The details submitted along the form will be used to submit the event details to the school.

          Please ensure there is a minimum of FOURTEEN (14) days between the submission day (every Tuesday/Friday of the week) to the event day itself.

          NOTE: Ensure that you have submitted the SARAH Risk Assessment and have completed the venue booking BEFORE you submit this form.</FormLabel>
        <iframe
          //src="https://forms.gle/Rfzed5ZHWXy5RdA68"
          src=" https://forms.gle/yujspP6WVvmHBeoU8"
          width="100%"
          height="1000"
        >
          Loading...
        </iframe>
        <FormControl>
          <FormLabel></FormLabel>
          <Checkbox
            id="isChecked"
            name="isChecked"
            isChecked={isChecked}
            onChange={handleCheckboxChange}
          >
            EMS Form has been filled and submitted above
          </Checkbox>
          {formik.touched.checkedBox && formik.errors.checkedBox && (
            <Text color="red">{formik.errors.checkedBox}</Text>
          )}
        </FormControl>
        {/* Submit Button */}
        <Button type="submit" disabled={!isChecked}>Submit</Button>
      </Stack>
    </form>
  );
}

export default CreateEventForm;
