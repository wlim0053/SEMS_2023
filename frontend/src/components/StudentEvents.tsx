import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
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
      <Accordion
        allowToggle
        allowMultiple
        ml={{ base: "1rem", md: "2rem" }}
        mr={{ base: "1rem", md: "2rem" }}
      >
        {events.map((event) => (
          <AccordionItem key={event.eventNo}>
            <h2>
              <AccordionButton borderBottom="1px solid #ccc" bg="#d9d9d9">
                <Box flex="3" textAlign="left">
                  {event.eventName}
                </Box>
                <Box flex="1">
                  <Text as="time" dateTime={event.dateTime.toISOString()}>
                    {event.dateTime.toLocaleString()}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>Event No: {event.eventNo}</Text>
              <Text>Club: {event.club}</Text>
              <Text>Venue: {event.venue}</Text>
              <Text>Description: {event.description}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default StudentEvents;
