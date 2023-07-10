import React, { useState, useEffect } from "react";
import { Route, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Input,
  Table,
  Thead,
  Tbody,
  Select,
  Button,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Wrap,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormControlProps,
  FormHelperText,
  FormErrorMessage,
  CloseButton,
  IconButton,
  Stack,
  HStack,
  Alert,
  AlertIcon,
  useToast,
  Link,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Badge,
  Tag,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { BiUpload } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import api from "../../utils/api";

const EventApproval = () => {
  const headers = [
    { key: "eventName", value: "Event" },
    { key: "organiserName", value: "Club" },
    { key: "eventStatus", value: "Status" },
    { key: "eventDetails", value: "Details" },
    { key: "actions", value: "Actions", disableSorting: true },
  ];

  type sortField = "Event" | "Status" | "Email";
  const [viewEvent, setViewEvent] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventID, setEventID] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState<sortField>("Event");

  const [inputEmsNumber, setInputEmsNumber] = useState("");
  const [inputEmsLink, setInputEmsLink] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [eventStatusColor, setEventStatusColor] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const {
    isOpen: isOpenDetails,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure();

  const cancelRef = React.useRef();
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const history = useNavigate();
  const isErrorEmsNumber = inputEmsNumber === "";
  const isErrorEmsLink = inputEmsLink === "";

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value as sortField);
  };

  const fetchEvent = async () => {
    try {
      const response = await api.get("/event/for-organiser?event_status=P");
      setEvents(response.data);
      console.log(response.data);
      switch (response.data[0].event_status) {
        case "P":
          setEventStatus("Pending");
          setEventStatusColor("yellow");
          break;
        case "A":
          setEventStatus("Approved");
          setEventStatusColor("green");
          break;
        case "R":
          setEventStatus("Rejected");
          setEventStatusColor("red");
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to set event ems number and link
  const getEventById = async (id: string) => {
    try {
      const response = await api.get(`/event/for-organiser/${id}`);
      setViewEvent(response.data);
      setEventID(id);
    } catch (error) {
      console.log(error);
    }
  };

  // function to approve the event
  const approveEvent = async (id: string) => {
    const bodyUpdate = {
      event_ems_no: inputEmsNumber,
      event_ems_link: inputEmsLink,
    };
    try {
      if (eventStatus != "Approved" && eventStatus != "Rejected") {
        const response = await api.patch(
          `/event/for-admin/${id}/approve`,
          bodyUpdate
        );
        console.log(response.data);
        setTimeout(() => fetchEvent(), 200);
        toast({
          title: "Event has been approved!",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function to reject the event
  const rejectEvent = async (id: string) => {
    try {
      if (eventStatus != "Rejected" && eventStatus != "Approved") {
        const response = await api.patch(`/event/for-admin/${id}/reject`);
        console.log(response.data);
        setTimeout(() => fetchEvent(), 200);
        toast({
          title: "Event has been rejected!",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //run fetchEvent when the page loads
  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    //add each component to box and add flex or wrap to make it responsive
    <Box width="100%" p="10" overflowX="auto">
      <Text fontSize="4xl"> Event Approval</Text>
      <Box
        width="100%"
        pt={5}
        pb={5}
        overflowX="auto"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for an event"
          width="20%"
        />
        <Text px={5}>Sort by: </Text>
        <Select
          variant="outline"
          placeholder="--select an option--"
          width="20%"
          onChange={handleSort}
          value={selectedSort}
        >
          <option key="option1" value="option1">
            Status
          </option>
          <option key="option2" value="option2">
            Event
          </option>
        </Select>
      </Box>

      <Table variant="striped">
        <Thead bg="#006DAE">
          <Tr>
            {headers.map((header) => (
              <Td color="white" key={header.key}>
                {header.value}
              </Td>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {events
            .filter((event: any) => {
              return searchTerm.toLowerCase() === ""
                ? event
                : event.event_title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
            .map((event: any) => (
              <Tr key="table">
                <Td key="event title">{event.event_title}</Td>
                <Td key="organiser name">{event.organiser_name}</Td>
                <Td key="status">
                  <Tag colorScheme={eventStatusColor}>{eventStatus}</Tag>
                </Td>
                <Td key="details">
                  <Link
                    textColor="blue.600"
                    fontWeight="semibold"
                    onClick={() => {
                      getEventById(event.event_uuid);
                      onOpenDetails();
                    }}
                  >
                    View More
                  </Link>
                </Td>
                <Td key="actions">
                  <HStack spacing={3}>
                    <Button
                      colorScheme="whatsapp"
                      variant="outline"
                      border="1px"
                      leftIcon={<CheckIcon />}
                      onClick={() => {
                        getEventById(event.event_uuid);
                        onOpen();
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      border="1px"
                      leftIcon={<CloseIcon />}
                      onClick={() => {
                        getEventById(event.event_uuid);
                        onOpenAlert();
                      }}
                    >
                      Reject
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Approval of Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>EMS Number</FormLabel>
                  <Input
                    placeholder="EMS Number"
                    onChange={(e) => setInputEmsNumber(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>EMS Link</FormLabel>
                  <Input
                    placeholder="EMS Link"
                    onChange={(e) => setInputEmsLink(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    approveEvent(eventID);
                    onClose();
                  }}
                >
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal onClose={onCloseDetails} isOpen={isOpenDetails} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Event Details</ModalHeader>
              <ModalBody>
                {viewEvent.map((event: any) => (
                  <Box key="detailBox">
                    <Text key="details">
                      Title: {event.event_title} <br />
                      Description: {event.event_desc} <br />
                      Organiser: {event.organiser_name} <br />
                      Start Date: {event.event_start_date} <br />
                      End Date: {event.event_end_date} <br />
                      Venue: {event.event_venue} <br />
                      Capacity: {event.event_capacity} <br />
                      EMS Number: {event.event_ems_no} <br />
                      EMS Link: {event.event_ems_link} <br />
                    </Text>
                  </Box>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button onClick={onCloseDetails}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <AlertDialog
            isOpen={isOpenAlert}
            leastDestructiveRef={cancelRef}
            onClose={onCloseAlert}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Reject Event
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You won't be able undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onCloseAlert}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      rejectEvent(eventID);
                      onCloseAlert();
                    }}
                    ml={3}
                  >
                    Reject
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Tbody>
      </Table>
      <Outlet />
    </Box>
  );
};

export default EventApproval;
