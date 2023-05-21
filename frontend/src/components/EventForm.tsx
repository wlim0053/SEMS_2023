import React from "react";
import {
  Box,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

const EventForm = () => {
  const [title, setTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [eventDesc, setEventDesc] = React.useState("");
  const [eventMode, setEventMode] = React.useState("");
  const [eventVenue, setEventVenue] = React.useState("");
  const [eventCapacity, setEventCapacity] = React.useState("");
  const [regStartDate, setRegStartDate] = React.useState("");
  const [regEndDate, setRegEndDate] = React.useState("");
  const [regGoogleForm, setRegGoogleForm] = React.useState("");

  return (
    <>
      <Box
        color="gray.600"
        fontSize="sm"
        width="60em"
        margin={"auto"}
        padding={6}
        borderWidth={3}
        borderColor={"#000000"}
        marginTop={6}
        marginBottom={6}
      >
        <Heading marginBottom={9} marginTop={6}>
          Create an Event
        </Heading>
        <Stack spacing={4} fontFamily={"Arial"}>
          <Text fontSize="md"> Event Title</Text>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></Input>
          <Text fontSize="md">Start date</Text>
          <Input
            type="datetime-local"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          ></Input>
          <Text fontSize="md">End date</Text>
          <Input
            type="datetime-local"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          ></Input>
          <Text fontSize="md">Description</Text>
          <Textarea
            size="md"
            minHeight={100}
            placeholder="Your answer"
            value={eventDesc}
            onChange={(event) => setEventDesc(event.target.value)}
          ></Textarea>
          <Text fontSize="md">Mode</Text>
          <Select
            placeholder="Select option"
            value={eventMode}
            onChange={(event) => setEventMode(event.target.value)}
          >
            <option value="P">Physical</option>
            <option value="V">Virtual</option>
            <option value="H">Hybrid</option>
          </Select>
          <Text fontSize="md">Venue</Text>
          <Input
            value={eventVenue}
            onChange={(event) => setEventVenue(event.target.value)}
          ></Input>
          <Text fontSize="md">Capacity</Text>
          <Input
            type={"number"}
            value={eventCapacity}
            onChange={(event) => setEventCapacity(event.target.value)}
          ></Input>

          <Text fontSize="md">Registering Start date</Text>
          <Input
            type="datetime-local"
            value={regStartDate}
            onChange={(event) => setRegStartDate(event.target.value)}
          ></Input>
          <Text fontSize="md">Registering End date</Text>
          <Input
            type="datetime-local"
            value={regEndDate}
            onChange={(event) => setRegEndDate(event.target.value)}
          ></Input>
          <Text fontSize="md"> Registration Google Form Link</Text>
          <Input
            value={regGoogleForm}
            onChange={(event) => setRegGoogleForm(event.target.value)}
          ></Input>
        </Stack>
      </Box>
    </>
  );
};

export default EventForm;
