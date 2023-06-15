import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function StudentEvents() {
  interface Event {
    event_uuid: string;
    event_ems_no: string | null;
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
    organiser_uuid: string;
    parent_uuid: string | null;
    organiser_name: string;
    stu_fire_id: string;
  }

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/event")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.log(error));
  }, []);

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
        allowMultiple
        ml={{ base: "1rem", md: "2rem" }}
        mr={{ base: "1rem", md: "2rem" }}
      >
        {events.map((event) => {
          const startDate = new Date(event.event_start_date);
          const endDate = new Date(event.event_end_date);
          const startDateTime = startDate.toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          const startTime = startDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          const endTime = endDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });

          return (
            <AccordionItem key={event.event_uuid}>
              <h2>
                <AccordionButton
                  borderBottom="1px solid #ccc"
                  bg="#d9d9d9"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                >
                  <Box flex="3" textAlign="left" mr={2}>
                    {event.event_title}
                  </Box>
                  <Box flex="1">
                    <Text>{startDateTime}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} pt={2} pl={2} pr={4}>
                <Text>Description: {event.event_desc}</Text>
                <Text>Club: {event.organiser_name}</Text>
                <Text>
                  Start Date:{" "}
                  {startDate.toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
                <Text>
                  End Date:{" "}
                  {endDate.toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
                <Text>Start Time: {startTime}</Text>
                <Text>End Time: {endTime}</Text>
                <Text>Venue: {event.event_venue}</Text>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
}

export default StudentEvents;
