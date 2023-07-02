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
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../utils/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

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
  description: yup.string().required("Description is required"),
  capacity: yup
    .number()
    .required("Capacity is required")
    .positive("Capacity must be a positive number"),
  venue: yup.string().required("Venue is required"),
  eventStatus: yup.string().required("Event status is required"),
  eventMode: yup.string().required("Event mode is required"),
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

interface SubmittedEventData {
  event_ems_no: string | null;
  event_ems_link: string | null;
  event_start_date: string;
  event_end_date: string;
  event_title: string;
  event_desc: string;
  event_mode: string;
  event_venue: string;
  event_capacity: number;
  event_status: string;
  event_reg_start_date: string;
  event_reg_end_date: string;
  event_reg_google_form: string;
}

function CreateEventPage() {
  const handleButtonClick = () => {
    const googleFormUrl = "https://forms.gle/gJkH9m6bHcMguMH17"; // Test form
    const openPopup = () => {
      const width = 600;
      const height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      window.open(
        googleFormUrl,
        "_blank",
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
      );
    };

    openPopup();
  };

  const navigate = useNavigate();

  const createEventInDatabase = async (eventData: SubmittedEventData) => {
    try {
      console.log(eventData);
      let response = await api.post("/event/for-organiser", eventData);
      console.log(response.data); // Response data from the server
      returnToOrganiserMainPage();

      // Handle the response or perform any necessary actions
    } catch (error) {
      console.log(`Error: ${error}`);
      // Handle the error appropriately
    }
  };

  const formik = useFormik({
    initialValues: {
      eventTitle: "",
      description: "",
      capacity: 0,
      venue: "",
      eventStatus: "",
      eventMode: "",
      eventStart: null,
      eventEnd: null,
      registrationStart: null,
      registrationEnd: null,
      signUpFormLink: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const eventData = {
        event_ems_no: null,
        event_ems_link: null,
        event_start_date: formik.values.eventStart || "",
        event_end_date: formik.values.eventEnd || "",
        event_title: formik.values.eventTitle,
        event_desc: formik.values.description,
        event_mode: formik.values.eventMode,
        event_venue: formik.values.venue,
        event_capacity: formik.values.capacity,
        event_status: formik.values.eventStatus,
        event_reg_start_date: formik.values.registrationStart || "",
        event_reg_end_date: formik.values.registrationEnd || "",
        event_reg_google_form: formik.values.signUpFormLink,
      };

      createEventInDatabase(eventData);
    },
  });

  const returnToOrganiserMainPage = () => {
    navigate("/OrganiserMainPage");
  };

  const disableDatesBeforeToday = (date: Date) => {
    const today = new Date();
    return date > today;
  };

  const disableDatesBeforeRegistrationStart = (date: Date) => {
    return formik.values.registrationStart !== null
      ? date > new Date(formik.values.registrationStart)
      : true;
  };

  const disableDatesBeforeRegistrationEnd = (date: Date) => {
    return formik.values.registrationEnd !== null
      ? date > new Date(formik.values.registrationEnd)
      : true;
  };

  const disableDatesAfterRegistrationEnd = (date: Date) => {
    return formik.values.registrationEnd !== null
      ? date > new Date(formik.values.registrationEnd)
      : true;
  };

  const disableDatesBeforeEventStarts = (date: Date) => {
    return formik.values.eventStart !== null
      ? date >= new Date(formik.values.eventStart)
      : true;
  };

  const disableDatesAfterEventStarts = (date: Date) => {
    return formik.values.eventStart !== null
      ? date <= new Date(formik.values.eventStart)
      : true;
  };

  const disableDatesAfterEventEnd = (date: Date) => {
    return formik.values.eventEnd !== null
      ? date <= new Date(formik.values.eventEnd)
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
        <Box>
          {/*Because Stack from Chakra UI refrains the first element from being moved, this box is a placeholder for ui aspect*/}
        </Box>
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

        {/* Capacity, Venue, Event Mode, Event Semester */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {/* Capacity */}
          <FormControl>
            <FormLabel>Capacity</FormLabel>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter capacity"
            />
            {formik.touched.capacity && formik.errors.capacity && (
              <Text color="red">{formik.errors.capacity}</Text>
            )}
          </FormControl>

          {/* Venue */}
          <FormControl>
            <FormLabel>Venue</FormLabel>
            <Input
              id="venue"
              name="venue"
              type="text"
              value={formik.values.venue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter venue"
            />
            {formik.touched.venue && formik.errors.venue && (
              <Text color="red">{formik.errors.venue}</Text>
            )}
          </FormControl>

          {/* Event Mode */}
          <FormControl>
            <FormLabel>Event Mode</FormLabel>
            <Select
              id="eventMode"
              name="eventMode"
              value={formik.values.eventMode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Select mode of event"
            >
              <option value="P">Physical</option>
              <option value="V">Virtual</option>
              <option value="H">Hybrid</option>
            </Select>
            {formik.touched.eventMode && formik.errors.eventMode && (
              <Text color="red">{formik.errors.eventMode}</Text>
            )}
          </FormControl>

          {/* Event Status */}
          <FormControl>
            <FormLabel>Event Status</FormLabel>
            <Select
              id="eventStatus"
              name="eventStatus"
              value={formik.values.eventStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Select Desired Status"
            >
              <option value="D">Draft</option>
              <option value="P">Pending</option>
            </Select>
            {formik.touched.eventStatus && formik.errors.eventStatus && (
              <Text color="red">{formik.errors.eventStatus}</Text>
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
          {/* Event Start (Date and Time) */}
          <FormControl>
            <FormLabel>Event Start (Date and Time)</FormLabel>
            <DatePicker
              id="eventStart"
              name="eventStart"
              selected={
                formik.values.eventStart
                  ? new Date(formik.values.eventStart)
                  : null
              }
              onChange={(date) => {
                if (date) {
                  const formattedDate = format(
                    date,
                    "yyyy-MM-dd'T'HH:mm:ss'Z'"
                  );
                  formik.setFieldValue("eventStart", formattedDate);
                } else {
                  formik.setFieldValue("eventStart", "");
                }
              }}
              onBlur={formik.handleBlur}
              showTimeInput
              timeInputLabel="Time:"
              dateFormat="dd/MM/yyyy h:mm aa"
              customInput={<Input />}
              filterDate={(date) =>
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
              selected={
                formik.values.eventEnd ? new Date(formik.values.eventEnd) : null
              }
              onChange={(date) => {
                if (date) {
                  const formattedDate = format(
                    date,
                    "yyyy-MM-dd'T'HH:mm:ss'Z'"
                  );
                  formik.setFieldValue("eventEnd", formattedDate);
                } else {
                  formik.setFieldValue("eventEnd", "");
                }
              }}
              onBlur={formik.handleBlur}
              showTimeInput
              timeInputLabel="Time:"
              dateFormat="dd/MM/yyyy h:mm aa"
              customInput={<Input />}
              filterDate={(date) =>
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
              selected={
                formik.values.registrationStart
                  ? new Date(formik.values.registrationStart)
                  : null
              }
              onChange={(date) => {
                if (date) {
                  const formattedDate = format(
                    date,
                    "yyyy-MM-dd'T'HH:mm:ss'Z'"
                  );
                  formik.setFieldValue("registrationStart", formattedDate);
                } else {
                  formik.setFieldValue("registrationStart", "");
                }
              }}
              onBlur={formik.handleBlur}
              showTimeInput
              timeInputLabel="Time:"
              dateFormat="dd/MM/yyyy h:mm aa"
              customInput={<Input />}
              filterDate={(date) =>
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
              selected={
                formik.values.registrationEnd
                  ? new Date(formik.values.registrationEnd)
                  : null
              }
              onChange={(date) => {
                if (date) {
                  const formattedDate = format(
                    date,
                    "yyyy-MM-dd'T'HH:mm:ss'Z'"
                  );
                  formik.setFieldValue("registrationEnd", formattedDate);
                } else {
                  formik.setFieldValue("registrationEnd", "");
                }
              }}
              onBlur={formik.handleBlur}
              showTimeInput
              timeInputLabel="Time:"
              dateFormat="dd/MM/yyyy h:mm aa"
              customInput={<Input />}
              filterDate={(date) =>
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
        <span style={{ color: "red", fontWeight: "bold" }}>
          Make sure that your popups are on and that you have allowed popups for
          the EMS Form
        </span>
        <FormControl>
          <FormLabel>
            By submitting this form, you are acknowledging that your event plan
            is final and no changes can be made to said plan. The details
            submitted along the form will be used to submit the event details to
            the school. Please ensure there is a minimum of FOURTEEN (14) days
            between the submission day (every Tuesday/Friday of the week) to the
            event day itself. NOTE: Ensure that you have submitted the SARAH
            Risk Assessment and have completed the venue booking BEFORE you
            submit this form.
          </FormLabel>
          <button
            type="button"
            onClick={handleButtonClick}
            style={{
              color: "#ffffff",
              background: "#006DAE",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
            }}
          >
            Open Google Form
          </button>
        </FormControl>
        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}

export default CreateEventPage;
