import React, { useState } from "react";
import { Box, Button, Checkbox, FormControl, FormLabel, Grid, GridItem, Input, Textarea, Heading, Text, chakra, Stack, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon} from "@chakra-ui/icons";


const CustomLink = chakra('a', {
  baseStyle: {
    color: 'blue.500',
    _hover: {
      textDecoration: 'underline',
    },
  },
});

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
  const [selectedEventCategories, setSelectedEventCategories] = useState<string[]>([]);
  const [eventCategoryOther, setEventCategoryOther] = useState("");
  const [activityAssessment, setActivityAssessment] = useState<ActivityAssessment>({});
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [recurringEvent, setRecurringEvent] = useState(false);
  const [eventFrequency, setEventFrequency] = useState("");
  const [remarks, setRemarks] = useState("");
  const [eventMode, setEventMode] = useState("Physical");
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

  const handleCategoryCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedEventCategories((prevCategories) => [...prevCategories, category]);
    } else {
      setSelectedEventCategories((prevCategories) => prevCategories.filter((c) => c !== category));
    }
  };

  const handleCategoryOtherInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventCategoryOther(event.target.value);
  };

  const handleSubmit = () => {
    if (eventMode === "Physical") {
      window.location.href = '/CreateEventForm4a';
    }
    if (eventMode === "Virtual") {
      window.location.href = '/CreateEventForm4b';
    }
  };

  const handleBackButtonClick = () => {
    window.location.href = "/CreateEventForm2";
  };

  return (
    <Box p={4}>

    <Button
      variant="unstyled"
      _hover={{ textDecoration: 'none' }}
      alignItems="center"
      
      onClick={handleBackButtonClick}
    >
      <Icon as={ChevronLeftIcon} display="inline-block" mb={1} color="gray.400" />
      <Text display="inline-block" color="gray.400">
        Back
      </Text>
    </Button>
      <Heading as="h2" mb={4}>
        Event Details
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
              isChecked={selectedEventCategories.includes(category)}
              onChange={(e) => handleCategoryCheckboxChange(category, e.target.checked)}
            >
              {category}
            </Checkbox>
          ))}
        </Grid>
      </FormControl>

      {selectedEventCategories.includes("Other") && (
        <FormControl mb={4}>
          <FormLabel>Other Event Category</FormLabel>
          <Input
            value={eventCategoryOther}
            onChange={handleCategoryOtherInputChange}
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
        <Stack direction="row" align="center" display={"block"}>
          <FormControl mb={1}>

            <Button  as="span" variant="outline" size="sm" mb={1}>
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
          <Text fontSize="sm" color="gray.500" mt={1}>
            Download the template{' '}
            <CustomLink
              href="https://docs.google.com/document/d/1LmxXij2Es3W5FJslif-pyWEiX0dqD7KF/edit?usp=sharing&ouid=109039236319263624802&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </CustomLink>
                  .
          </Text>
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
        <Stack spacing={2}>
          <Checkbox
            isChecked={eventMode === "Physical"}
            onChange={(e) => {
              setEventMode(e.target.checked ? "Physical" : "");
            }}
          >
            Physical
          </Checkbox>
          <Checkbox
            isChecked={eventMode === "Virtual"}
            onChange={(e) => {
              setEventMode(e.target.checked ? "Virtual" : "");
            }}
          >
            Virtual
          </Checkbox>
        </Stack>
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Next
      </Button>
    </Box>
  );
};

export default Page3;