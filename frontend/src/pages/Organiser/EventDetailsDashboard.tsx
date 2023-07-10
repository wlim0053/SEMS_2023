import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AttendanceForm from "../../components/Organizer/AttendanceForm";
import {
  Box,
  Heading,
  Flex,
  Text,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import api from "../../utils/api";

interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
}

interface EventData {
  event_uuid: string;
  organiser_uuid: string;
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
  no_participants: number;
  parent_uuid: string | null;
  organiser_name: string;
  user_fire_id: string;
}

const EventDetailsDashboard = () => {
  const location = useLocation();
  const selectedEventUUID = location.state.selectedEventUUID;
  const [selectedEventData, setSelectedEventData] = useState<EventData>();

  // const fetchSelectedEventFromDatabase = async () => {
  //   console.log("Selected event UUID: " + selectedEventUUID);
  //   const response = await api.get(`/event/for-organiser/${selectedEventUUID}`);
  //   console.log(response.data);
  //   return response.data[0];
  // };

  // useEffect(() => {
  //   fetchSelectedEventFromDatabase()
  //     .then((data) => {
  //       setSelectedEventData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching event:", error);
  //     });
  // }, []);


  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  const dateTimeFormatter = (dateTime: string): string => {
    const date = new Date(dateTime);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    return formattedDateTime;
  };

  const getEventModeString = (status: string): string => {
    switch (status) {
      case "P":
        return "Physical";
      case "V":
        return "Virtual";
      case "H":
        return "Hybrid";
      default:
        return "";
    }
  };

  const handleCheckboxChange = (student: Student) => {
    const index = selectedStudents.findIndex((s) => s.id === student.id);
    if (index === -1) {
      setSelectedStudents([...selectedStudents, student]);
    } else {
      const updatedStudents = [...selectedStudents];
      updatedStudents.splice(index, 1);
      setSelectedStudents(updatedStudents);
    }
  };

  const handleSubmitAttendance = () => {
    console.log("Hello");
    // const presentCount = selectedStudents.length;
    // const absentCount = students.length - presentCount;
    // const turnoutRate = (presentCount / students.length) * 100;

    // setTurnoutDetails({
    //   present: presentCount,
    //   absent: absentCount,
    //   turnoutRate,
    // });

    // setAttendanceSubmitted(true);
    // onOpen();
  };

  const handleResetAttendance = () => {
    console.log("Hello")
    // setSelectedStudents([]);
    // setAttendanceSubmitted(false);
    // onClose();
  };
  return (
    <Box
      p={4}
      fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
    >
      <Heading size="lg" mb={4}>
        Event Details
      </Heading>

      <Box borderWidth={1} borderRadius="md" boxShadow="md" p={4} mb={4}>
        <Text fontWeight="bold" fontSize="18px" mb={2}>
          Name:
        </Text>
        <Text fontSize="18px">{selectedEventData?.event_title}</Text>

        <Text fontWeight="bold" fontSize="18px" mt={4} mb={2}>
          Description:
        </Text>
        <Text fontSize="18px">{selectedEventData?.event_desc}</Text>

        <Text fontWeight="bold" marginRight={2} mt={4} mb={2} fontSize="18px">
          Event Start Date and Time:
        </Text>
        <Text fontSize="18px">
          {dateTimeFormatter(selectedEventData?.event_start_date ?? "")}
        </Text>

        <Text
          fontWeight="bold"
          marginBottom={2}
          marginRight={2}
          mt={4}
          mb={2}
          fontSize="18px"
        >
          Event End Date and Time:
        </Text>
        <Text fontSize="18px" marginBottom={2}>
          {dateTimeFormatter(selectedEventData?.event_end_date ?? "")}
        </Text>
      </Box>

      <Grid
        templateColumns="1fr 1fr"
        gap={4}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        p={4}
        mb={4}
      >
        <Box>
          <Flex alignItems="center" mb={2}>
            <Text fontWeight="bold" marginRight={2} fontSize="18px">
              Capacity:
            </Text>
            <Text fontSize="18px">{selectedEventData?.event_capacity}</Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontWeight="bold" mb={2} marginRight={2} fontSize="18px">
              Venue:
            </Text>
            <Text fontSize="18px" mb={2} textAlign="justify">
              {selectedEventData?.event_venue}
            </Text>
          </Flex>

          <Flex alignItems="center" mb={2}>
            <Text fontWeight="bold" marginRight={2} fontSize="18px">
              Attendance Mode:
            </Text>
            <Text fontSize="18px">
              {getEventModeString(selectedEventData?.event_mode ?? "")}
            </Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontWeight="bold" marginRight={2} fontSize="18px">
              Links:
            </Text>
            <a
              href={selectedEventData?.event_reg_google_form}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Text
                fontSize="18px"
                _hover={{ color: "blue", textDecoration: "underline" }}
              >
                {selectedEventData?.event_reg_google_form}
              </Text>
            </a>
          </Flex>
        </Box>
      </Grid>

      <Grid
        templateColumns="1fr 1fr"
        gap={4}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        p={4}
        mb={4}
      >
        <Box>
          <Text fontWeight="bold" marginBottom={4} fontSize="13px">
            Attendance:
          </Text>
          <Box borderWidth={1} borderRadius="md" p={4}>
            <AttendanceForm event_uuid={"0F5F936C-67CF-4FDF-842A-90AB1D1E71BC"} event_status={"C"}/>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default EventDetailsDashboard;
