import React, { useState } from "react";
import { Box, Button, Checkbox, FormControl, FormLabel, Grid, GridItem, Input, Textarea, Heading, Stack } from "@chakra-ui/react";

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

  const handleActivityAssessmentChange = (factor: string, checked: boolean) => {
    setActivityAssessment((prevAssessment) => ({
      ...prevAssessment,
      [factor]: checked,
    }));
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
                  setEventCategory((prevCategories) => prevCategories.filter((c) => c !== category));
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

      <Box mb={4}>
        <FormLabel>11. Event Proposal</FormLabel>
        <p>
          This isn't a question, just a section to tell users to click on the link below to download the event proposal
          template:
        </p>
        <a
          href="https://docs.google.com/document/d/1LmxXij2Es3W5FJslif-pyWEiX0dqD7KF/edit?usp=sharing&ouid=109039236319263624802&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download the template here
        </a>
      </Box>

      <FormControl mb={4}>
        <FormLabel>13. Please select the mode of event</FormLabel>
        <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={4}>
          <Checkbox
            isChecked={eventMode.includes('Physical')}
            onChange={(e) => {
              if (e.target.checked) {
                setEventMode((prevModes) => [...prevModes, 'Physical']);
              } else {
                setEventMode((prevModes) => prevModes.filter((m) => m !== 'Physical'));
              }
            }}
          >
            Physical
          </Checkbox>
          <Checkbox
            isChecked={eventMode.includes('Virtual')}
            onChange={(e) => {
              if (e.target.checked) {
                setEventMode((prevModes) => [...prevModes, 'Virtual']);
              } else {
                setEventMode((prevModes) => prevModes.filter((m) => m !== 'Virtual'));
              }
            }}
          >
            Virtual
          </Checkbox>
        </Grid>
      </FormControl>



      <Button onClick={handleSubmit} colorScheme="blue" mt={4}>
        Submit
      </Button>
    </Box>
  );
};

export default Page3;
