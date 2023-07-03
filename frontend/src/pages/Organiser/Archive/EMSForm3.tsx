import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Textarea,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
  // Add more fields for EMSForm3
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

interface ClubOption {
  value: string;
  label: string;
}

interface ActivityAssessment {
  [key: string]: boolean;
}

interface EMSForm3Values {
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
}

const initialValues: EMSForm3Values = {
  eventName: "",
  eventObjective: "",
  attendees: 0,
  selectedEventCategories: [],
  eventCategoryOther: "",
  activityAssessment: {},
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  recurringEvent: false,
  eventFrequency: "",
  eventProposal: null,
  remarks: "",
  eventMode: "",
};

interface EMSForm3Props {
  next: (newData: Partial<Data>, final?: boolean, skipTo?: number) => void;
  prev: (newData: Partial<Data>) => void;
  data: Data;
}

const EMSForm3: React.FC<EMSForm3Props> = ({ next, prev, data }) => {
  const eventCategories = [
    "Exhibition",
    "Conference",
    "Seminar",
    "Meeting",
    "Visit",
    "Sports related",
    "Training",
    "Alumni",
    "Virtual",
    "Other",
  ];

  const activityFactors: string[] = [
    "Loud noise",
    "Water activity",
    "Heavy lifting",
    "Health hazard",
    "Far from emergency services",
    "Involves fire",
    "Involves use of chemicals",
    "Injury prone",
    "Outside of mobile phone coverage",
  ];

  const handleSubmit = (values: EMSForm3Values) => {
    console.log(values);
    // Handle form submission
  };

  const handleCategoryCheckboxChange = (
    category: string,
    checked: boolean,
    setFieldValue: (field: string, value: any) => void,
    selectedEventCategories: string[]
  ) => {
    let updatedCategories: string[];
    if (checked) {
      updatedCategories = [...selectedEventCategories, category];
    } else {
      updatedCategories = selectedEventCategories.filter((cat) => cat !== category);
    }
    setFieldValue("selectedEventCategories", updatedCategories);
  };

  const handleActivityAssessmentChange = (
    factor: string,
    checked: boolean,
    setFieldValue: (field: string, value: any) => void,
    activityAssessment: ActivityAssessment
  ) => {
    const updatedAssessment = { ...activityAssessment, [factor]: checked };
    setFieldValue("activityAssessment", updatedAssessment);
  };

  const handleEventProposalUpload = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("eventProposal", file);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Event Details
      </Heading>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <FormControl mb={4}>
              <FormLabel>1. Event Name</FormLabel>
              <Input
                name="eventName"
                placeholder="Enter event name"
                value={values.eventName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>2. Objective of Event</FormLabel>
              <Textarea
                name="eventObjective"
                placeholder="Enter event objective"
                rows={4}
                value={values.eventObjective}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>3. Expected number of attendees</FormLabel>
              <Input
                name="attendees"
                placeholder="Enter expected number of attendees"
                type="number"
                value={values.attendees}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>4. Event Category</FormLabel>
              <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={4}>
                {eventCategories.map((category) => (
                  <Checkbox
                    key={category}
                    isChecked={values.selectedEventCategories.includes(category)}
                    onChange={(e) =>
                      handleCategoryCheckboxChange(
                        category,
                        e.target.checked,
                        setFieldValue,
                        values.selectedEventCategories
                      )
                    }
                  >
                    {category}
                  </Checkbox>
                ))}
              </Grid>
            </FormControl>

            {values.selectedEventCategories.includes("Other") && (
              <FormControl mb={4}>
                <FormLabel>Other Event Category</FormLabel>
                <Input
                  name="eventCategoryOther"
                  value={values.eventCategoryOther}
                  onChange={handleChange}
                  placeholder="Enter other event category"
                />
              </FormControl>
            )}

            <FormControl mb={4}>
              <FormLabel>5. Assessment of activities</FormLabel>
              <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={4}>
                {activityFactors.map((factor) => (
                  <GridItem key={factor}>
                    <Checkbox
                      isChecked={values.activityAssessment[factor]}
                      onChange={(e) =>
                        handleActivityAssessmentChange(
                          factor,
                          e.target.checked,
                          setFieldValue,
                          values.activityAssessment
                        )
                      }
                    >
                      {factor}
                    </Checkbox>
                  </GridItem>
                ))}
              </Grid>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>6. Scheduled Start Date</FormLabel>
              <Input
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                type="date"
                placeholder="Select scheduled start date"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>7. Scheduled Start Time</FormLabel>
              <Input
                name="startTime"
                value={values.startTime}
                onChange={handleChange}
                type="time"
                placeholder="Select scheduled start time"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>8. Scheduled End Date</FormLabel>
              <Input
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                type="date"
                placeholder="Select scheduled end date"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>9. Scheduled End Time</FormLabel>
              <Input
                name="endTime"
                value={values.endTime}
                onChange={handleChange}
                type="time"
                placeholder="Select scheduled end time"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>10. Is this event a recurring event?</FormLabel>
              <Checkbox
                isChecked={values.recurringEvent}
                onChange={() =>
                  setFieldValue("recurringEvent", !values.recurringEvent)
                }
              >
                Yes
              </Checkbox>
              {values.recurringEvent && (
                <FormControl mt={2}>
                  <FormLabel>
                    Planned frequency of the event over the course of the year 2022
                  </FormLabel>
                  <Input
                    name="eventFrequency"
                    value={values.eventFrequency}
                    onChange={handleChange}
                    placeholder="Enter event frequency"
                  />
                </FormControl>
              )}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>11. Event Proposal</FormLabel>
              <Stack direction="row" align="center" display={"block"}>
                <FormControl mb={1}>
                  <Button as="span" variant="outline" size="sm" mb={1}>
                    Choose File
                  </Button>
                  <input
                    id="eventProposal"
                    type="file"
                    onChange={(event) => handleEventProposalUpload(event, setFieldValue)}
                    style={{ display: "none" }}
                  />
                </FormControl>
                <Text size={"sm"}>{values.eventProposal?.name || "No file chosen"}</Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Download the template{" "}
                  <a
                    href="https://docs.google.com/document/d/1LmxXij2Es3W5FJslif-pyWEiX0dqD7KF/edit?usp=sharing&ouid=109039236319263624802&rtpof=true&sd=true"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                  .
                </Text>
              </Stack>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>12. Remarks</FormLabel>
              <Textarea
                name="remarks"
                value={values.remarks}
                onChange={handleChange}
                placeholder="Enter remarks"
                rows={4}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>13. Mode of Event</FormLabel>
              <Stack spacing={2}>
                <Checkbox
                  isChecked={values.eventMode === "Physical"}
                  onChange={() =>
                    setFieldValue("eventMode", values.eventMode === "Physical" ? "" : "Physical")
                  }
                >
                  Physical
                </Checkbox>
                <Checkbox
                  isChecked={values.eventMode === "Virtual"}
                  onChange={() =>
                    setFieldValue("eventMode", values.eventMode === "Virtual" ? "" : "Virtual")
                  }
                >
                  Virtual
                </Checkbox>
              </Stack>
            </FormControl>

            <Button colorScheme="blue" type="submit">
              Next
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EMSForm3;
