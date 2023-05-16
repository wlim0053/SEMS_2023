//stub code
import React from "react";
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
function StudentEvents() {
  type Event = {
    eventNo: number;
    eventName: string;
    club: string;
    dateTime: Date;
    venue: string;
    description: string;
  };

  const events: Event[] = [
    {
      eventNo: 1,
      eventName: "Sustainability, Safety, Chem or Not?",
      club: "IEMMSS",
      dateTime: new Date("2023-05-06T10:00:00"),
      venue: "Zoom Meeting",
      description:
        "This webinar will introduce different aspects of engineering, with a focus on chemical engineering. We will explore the principles and applications of this interdisciplinary field, including the design of complex processes and the development of renewable energy sources.",
    },
    {
      eventNo: 2,
      eventName:
        "Beyond the Blue Skies: The Exciting Frontier of Aerospace Engineering",
      club: "IEMMSS",
      dateTime: new Date("2023-05-13T14:00:00"),
      venue: "Zoom Meeting",
      description:
        "This event is focused on exploring the promising advancements in space exploration and the significance of collaboration with various engineering industries in the future of aerospace engineering. Attendees will delve into the exciting possibilities that lie ahead, including commercial satellites, interstellar travel, and sustainable solutions that will shape the aircraft and spacecraft of tomorrow. Join us for a journey into the thrilling future of space exploration that promises to take us beyond our wildest dreams.",
    },
    {
      eventNo: 3,
      eventName: "ChemE Car Workshop",
      club: "CHEMECAR",
      dateTime: new Date("2023-05-06T09:00:00"),
      venue: "The Porch",
      description:
        "This workshop aims to provide students with hands-on experience in building a ChemE Car. Students will construct a simple chemically operated (to start and stop from chemical reaction(s)) A4-sized car",
    },
  ];

  const headers = ["Event Name", "Club", "Date & Time", "Venue", "Description"];

  return (
    <Box>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        fontFamily="Arial Narrow, sans-serif"
        textAlign="center"
        mt={8}
        mb={4}
        ml={{ base: "1rem", md: "2rem" }}
      >
        My Events
      </Text>
      <Table
        variant="simple"
        size="md"
        width="auto"
        mx="auto"
        ml={{ base: "1rem", md: "2rem" }}
        mr={{ base: "1rem", md: "2rem" }}
        mb={{ base: "1rem", md: "2rem" }}
      >
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th
                key={header}
                whiteSpace="nowrap"
                backgroundColor="#f2f2f2"
                fontWeight="bold"
                border="1px solid #ccc"
                padding="0.5rem"
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {events.map((event) => (
            <Tr key={event.eventNo}>
              <Td border="1px solid #ccc" padding="0.5rem">{event.eventName}</Td>
              <Td border="1px solid #ccc" padding="0.5rem">{event.club}</Td>
              <Td border="1px solid #ccc" padding="0.5rem">
                <Text as="time" dateTime={event.dateTime.toISOString()}>
                  {event.dateTime.toLocaleString()}
                </Text>
              </Td>
              <Td border="1px solid #ccc" padding="0.5rem">{event.venue}</Td>
              <Td border="1px solid #ccc" padding="0.5rem">{event.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default StudentEvents;
