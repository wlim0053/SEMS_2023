import React, { useState } from "react";
import { Box, Button, Checkbox, FormControl, FormLabel, Grid, GridItem, Input, Textarea, Heading, Text, Stack } from "@chakra-ui/react";


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
const handleButtonClick = () => {
  // Redirect to another page
  window.location.href = '/CreateEventForm4a';
};
const handleButtonClick2 = () => {
  // Redirect to another page
  window.location.href = '/CreateEventForm4b';
};
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

interface ActivityAssessment {
  [factor: string]: boolean;
}

const Page3 = () => {
  const [eventName, setEventName] = useState("");
  const [eventObjective, setEventObjective] = useState("");
  const [attendees, setAttendees] = useState("");
  const [eventCategory, setEventCategory] = useState<string[]>([]);
  const [activityAssessment, setActivityAssessment] = useState<ActivityAssessment>({});
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [recurringEvent, setRecurringEvent] = useState(false);
  const [eventFrequency, setEventFrequency] = useState("");
  const [remarks, setRemarks] = useState("");
  const [eventMode, setEventMode] = useState<string[]>([]);
  const [eventProposal, setEventProposal] = useState<File | undefined>(undefined);

  const handleActivityAssessmentChange = (factor: string, checked: boolean) => {
    setActivityAssessment((prevAssessment) => ({
      ...prevAssessment,
      [factor]: checked,
    }));
  };

  const handleEventProposalUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setEventProposal(file);
  };

  const handleSubmit = () => {
    // Handle form submission
    // You can access the form data using the state variables
    console.log("Form submitted:", {
      eventName,
      eventObjective,
      attendees,
      eventCategory,
      activityAssessment,
      startDate,
      startTime,
      endDate,
      endTime,
      recurringEvent,
      eventFrequency,
      remarks,
      eventMode,
      eventProposal,
    });
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Page 3: Event Details
      </Heading>

      <FormControl mb={4}>
        <FormLabel>1. Event Name</FormLabel>
        <Input
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>2. Objective of Event</FormLabel>
        <Textarea
          value={eventObjective}
          onChange={(e) => setEventObjective(e.target.value)}
          placeholder="Enter event objective"
          rows={4}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>3. Expected number of attendees</FormLabel>
        <Input
          value={attendees}
          onChange={(e) => setAttendees(e.target.value)}
          placeholder="Enter expected number of attendees"
          type="number"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>4. Event Category</FormLabel>
        <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={4}>
          {eventCategories.map((category) => (
            <Checkbox
              key={category}
              isChecked={eventCategory.includes(category)}
              onChange={(e) => {
                if (e.target.checked) {
                  setEventCategory((prevCategories) => [...prevCategories, category]);
                } else {
                  setEventCategory((prevCategories) =>
                    prevCategories.filter((c) => c !== category)
                  );
                }
              }}
            >
              {category}
            </Checkbox>
          ))}
        </Grid>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>5. Assessment of activities</FormLabel>
        <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={4}>
          {activityFactors.map((factor) => (
            <GridItem key={factor}>
              <Checkbox
                isChecked={activityAssessment[factor]}
                onChange={(e) => handleActivityAssessmentChange(factor, e.target.checked)}
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
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          type="date"
          placeholder="Select scheduled start date"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>7. Scheduled Start Time</FormLabel>
        <Input
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          type="time"
          placeholder="Select scheduled start time"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>8. Scheduled End Date</FormLabel>
        <Input
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          type="date"
          placeholder="Select scheduled end date"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>9. Scheduled End Time</FormLabel>
        <Input
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          type="time"
          placeholder="Select scheduled end time"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>10. Is this event a recurring event?</FormLabel>
        <Checkbox isChecked={recurringEvent} onChange={() => setRecurringEvent(!recurringEvent)}>
          Yes
        </Checkbox>
        {recurringEvent && (
          <FormControl mt={2}>
            <FormLabel>Planned frequency of the event over the course of the year 2022</FormLabel>
            <Input
              value={eventFrequency}
              onChange={(e) => setEventFrequency(e.target.value)}
              placeholder="Enter event frequency"
            />
          </FormControl>
        )}
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>11. Event Proposal</FormLabel>
        <Stack direction="row" align="center">
          <FormControl>
            <Button as="label" htmlFor="eventProposal" size="sm">
              Choose File
            </Button>
            <input
              id="eventProposal"
              type="file"
              onChange={handleEventProposalUpload}
              style={{ display: "none" }}
            />
          </FormControl>
          <Text size={"sm"}>{eventProposal?.name || "No file chosen"}</Text>
        </Stack>
      </FormControl>


      <FormControl mb={4}>
        <FormLabel>12. Remarks</FormLabel>
        <Textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Enter remarks"
          rows={4}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>13. Mode of Event</FormLabel>
        <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={4}>
          {/* <Checkbox
            isChecked={eventMode.includes("Physical")}
            onChange={(e) => {
              if (e.target.checked) {
                setEventMode((prevModes) => [...prevModes, "Physical"]);
              } else {
                setEventMode((prevModes) => prevModes.filter((m) => m !== "Physical"));
              }
            }}
          >
            Physical
          </Checkbox> */}
          <Button colorScheme="blue" onClick={handleButtonClick}>
            Physical
          </Button>
          {/* <Checkbox
            isChecked={eventMode.includes("Virtual")}
            onChange={(e) => {
              if (e.target.checked) {
                setEventMode((prevModes) => [...prevModes, "Virtual"]);
              } else {
                setEventMode((prevModes) => prevModes.filter((m) => m !== "Virtual"));
              }
            }}
          >
            Virtual
          </Checkbox> */}
          <Button colorScheme="blue" onClick={handleButtonClick2}>
            Virtual
          </Button>
        </Grid>
      </FormControl>



    </Box>
  );
};

export default Page3;
