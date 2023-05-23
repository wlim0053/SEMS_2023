import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import BulletList from "./BulletList.js";

interface EventData {
  id: string;
  event: string;
  venue: string;
  club: string;
  participants: string;
  date: string;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface EventCalendarProps {
  handleSelectedEvents: (events: any[]) => void;
  eventData: EventData[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ handleSelectedEvents, eventData }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateClick = (day: number, events: any[]) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    handleSelectedEvents(events);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(newDate);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getLastDayOfMonth = (year: number, month: number) => {
    const previousMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  };

  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(date.getFullYear(), date.getMonth());
  const lastDayOfMonth = getLastDayOfMonth(date.getFullYear(), date.getMonth());
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const days = [...Array(daysInMonth).keys()].map((i) => i + 1);
  const startingBlanks = [...Array(firstDayOfMonth).keys()];
  const endingBlanks = [...Array(35 - lastDayOfMonth).keys()];

  return (
    <Box p={4} bg={"gray.50"}>
      <Flex align="center" justify="space-between">
        <IconButton
          aria-label="Previous month"
          icon={<ArrowBackIcon />}
          onClick={handlePrevMonth}
        />
        <Heading size="lg">
          {monthName} {year}
        </Heading>
        <IconButton
          aria-label="Next month"
          icon={<ArrowForwardIcon />}
          onClick={handleNextMonth}
        />
      </Flex>
      <SimpleGrid columns={7} spacing={2} mt={4}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text key={day} fontWeight="bold">
            {day}
          </Text>
        ))}

        {startingBlanks.map((i) => (
          <Box key={i} bg={"gray.100"} borderRadius="md" />
        ))}

        {days.map((day) => {
          const events = eventData.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day && (eventDate.getMonth() + 1) === currentMonth;
          });
          return (
            <Box
              key={day}
              borderRadius="md"
              pl={2}
              pr={2}
              pt={2}
              pb={"12px"}
              onClick={() => handleDateClick(day, events)}
              bg={selectedDate.getDate() === day ? "blue.500" : "white"}
              color={selectedDate.getDate() === day ? "white" : ""}
              _hover={{ cursor: "pointer", bg: "gray.300" }}
              h={"100px"}
            >
              <Text>{day}</Text>
              {events.length > 0 ? <BulletList bulletPoints={events} /> : ""}
            </Box>
          );
        })}

        {endingBlanks.map((i) => (
          <Box key={i} bg={"gray.100"} borderRadius="md" />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EventCalendar;
