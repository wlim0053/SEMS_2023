import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Text,
  VStack,
  HStack,
  Badge,
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

interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
}

interface EventData {
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

const EventDetailsDashboard = () => {
  const location = useLocation();
  const eventData: EventData = location.state.eventData;

  // Sample fake data
  const fakeData = {
    numberOfMales: 20,
    numberOfFemales: 30,
    numberOfEngineeringSpecialization: 10,
    numberOfMedicineSpecialization: 5,
    numberOfArtsSpecialization: 15,
    // Add other properties as needed
  };

  const [students, setStudents] = useState<Student[]>([
    { id: 1, studentId: "321200", name: "Azhan", email: "emma.smith@student.monash.edu" },
    { id: 2, studentId: "329456", name: "Kidd", email: "david.jones@student.monash.edu" },
    { id: 3, studentId: "310024", name: "Jett", email: "sarah.wilson@student.monash.edu" },
    { id: 4, studentId: "346780", name: "Zubin", email: "alexander.brown@student.monash.edu" },

    // Add more students as needed
  ]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [turnoutDetails, setTurnoutDetails] = useState({
    present: 0,
    absent: 0,
    turnoutRate: 0,
  });

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
    const presentCount = selectedStudents.length;
    const absentCount = students.length - presentCount;
    const turnoutRate = (presentCount / students.length) * 100;

    setTurnoutDetails({
      present: presentCount,
      absent: absentCount,
      turnoutRate,
    });

    setAttendanceSubmitted(true);
    onOpen();
  };

  const handleResetAttendance = () => {
    setSelectedStudents([]);
    setAttendanceSubmitted(false);
    onClose();
  };

  const AlertDialogBox = (
    <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Attendance Summary
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text mb={2}>
              Present: {turnoutDetails.present} students
            </Text>
            <Text mb={2}>
              Absent: {turnoutDetails.absent} students
            </Text>
            <Text>
              Turnout Rate: {turnoutDetails.turnoutRate.toFixed(2)}%
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="blue" onClick={handleResetAttendance}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
  return (
    <Box p={4} fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif">
      <Heading size="lg" mb={4}>
        Event Details
      </Heading>

      <Box borderWidth={1} borderRadius="md" boxShadow="md" p={4} mb={4}>
        <Text fontWeight="bold" fontSize="12px" mb={2}>
          Name:
        </Text>
        <Text fontSize="12px">{eventData.event_title}</Text>

        <Text fontWeight="bold" fontSize="12px" mt={4} mb={2}>
          Description:
        </Text>
        <Text fontSize="12px">{eventData.event_desc}</Text>

        <Flex alignItems="center" mt={4} mb={2}>
          <Text fontWeight="bold" marginRight={2} fontSize="12px">
            Date:
          </Text>
          <Text fontSize="12px">{eventData.event_start_date}</Text>
        </Flex>

        <Flex alignItems="center">
          <Text fontWeight="bold" marginBottom={2} marginRight={2} fontSize="12px">
            Time:
          </Text>
          <Text fontSize="12px">{ }</Text>
        </Flex>
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
            <Text fontWeight="bold" marginRight={2} fontSize="12px">
              Capacity:
            </Text>
            <Text fontSize="12px">{eventData.event_capacity}</Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontWeight="bold" mb={2} marginRight={2} fontSize="12px">
              Venue:
            </Text>
            <Text fontSize="12px" textAlign="justify">{eventData.event_venue}</Text>
          </Flex>

          <Flex alignItems="center" mb={2}>
            <Text fontWeight="bold" marginRight={2} fontSize="12px">
              Recurring:
            </Text>
            <Text fontSize="12px">{ }</Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontWeight="bold" marginRight={2} fontSize="12px">
              Links and QR Code:
            </Text>
            <Text fontSize="12px">{eventData.event_reg_google_form}</Text>
          </Flex>
        </Box>

        <Box>
          <Text fontWeight="bold" marginBottom={2} fontSize="12px" mt={4}>
            Event Statistics:
          </Text>

          <VStack spacing={2} alignItems="start" pl={4}>
            <HStack>
              <Text fontWeight="bold" fontSize="12px">
                Number of Males:
              </Text>
              <Badge colorScheme="blue" fontSize="12px">{fakeData.numberOfMales}</Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="12px">
                Number of Females:
              </Text>
              <Badge colorScheme="pink" fontSize="12px">{fakeData.numberOfFemales}</Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="12px">
                Number of Engineering Specialization:
              </Text>
              <Badge colorScheme="green" fontSize="12px">
                {fakeData.numberOfEngineeringSpecialization}
              </Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="12px">
                Number of Medicine Specialization:
              </Text>
              <Badge colorScheme="red" fontSize="12px">
                {fakeData.numberOfMedicineSpecialization}
              </Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="12px">
                Number of Arts Specialization:
              </Text>
              <Badge colorScheme="purple" fontSize="12px">
                {fakeData.numberOfArtsSpecialization}
              </Badge>
            </HStack>
          </VStack>
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
          <Text fontWeight="bold" marginBottom={4} fontSize="13px" >
            Attendance:
          </Text>
          <Box borderWidth={1} borderRadius="md" p={4}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Student ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Attendance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {students.map((student) => (
                  <Tr key={student.id}>
                    <Td>{student.id}</Td>
                    <Td>{student.studentId}</Td>
                    <Td>{student.name}</Td>
                    <Td>{student.email}</Td>
                    <Td>
                      <Checkbox
                        isChecked={selectedStudents.includes(student)}
                        onChange={() => handleCheckboxChange(student)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>


          {!attendanceSubmitted ? (
            <Button
              colorScheme="blue"
              onClick={handleSubmitAttendance}
              mt={4}
            >
              Submit Attendance
            </Button>
          ) : null}
        </Box>
      </Grid>
      {attendanceSubmitted ? AlertDialogBox : null}
    </Box>



  );
};

export default EventDetailsDashboard;
