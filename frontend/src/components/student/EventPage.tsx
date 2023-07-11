import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";  

function EventPage() {
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

  type SortField =
    | "event_start_date"
    | "event_title"
    | "event_end_date"
    | "organiser_name";

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<SortField>("event_start_date");
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [sortedEvents, setSortedEvents] = useState<Event[]>([]);
  const [enrolmentYear, setEnrolmentYear] = useState(0);
  const [enrolmentIntake, setEnrolmentIntake] = useState(0);
  const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [clubs, setClubs] = useState<string[]>([]);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/event/for-student?event_status=A");
        const data = response.data;
        const filteredEvents = data.filter(
          (event: Event) =>
            selectedClubs.length === 0 ||
            selectedClubs.includes(event.organiser_name)
        );
        setEvents(filteredEvents);
        setSortedEvents(filteredEvents);

        const uniqueClubNames: string[] = [
          ...new Set(data.map((event: Event) => event.organiser_name)),
        ] as string[];
        setClubs(uniqueClubNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents().catch((error) => console.error(error));
  }, [selectedClubs]);

  // get from /participation and console.log

  useEffect(() => {
    const fetchParticipation = async () => {
      try {
        const response = await api.get("/participation?event_status=A");
        const data = response.data;

        setParticipatedEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParticipation().catch((error) => console.error(error));
  }, []);

  const isSignedUp = (eventUuid: string) => {
    return participatedEvents.some(
      (participation) => participation.event_uuid === eventUuid
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedEvent) {
      console.error("No event found");
      return;
    }

    // Proceed with sign-up if within the registration period
    // data to be sent
    const data = {
      event_uuid: selectedEvent?.event_uuid, // get the uuid of the selected event
      // user_fire_id: '123', // leave it blank for now
      participation_year: enrolmentYear,
      participation_semester: enrolmentIntake,
      participation_attendance: 0,
    };
    console.log(data);

    try {
      const response = await api.post("/participation", data);
      console.log(response.data);
      // Close the modal after successful submission
      setIsSignUpModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToCalendar = () => {
    navigate("/StudentHome");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortEvents = (field: SortField, order: string, events: Event[]) => {
    return [...events].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setSortedEvents(sortEvents(field, sortOrder, events));
  };

  const handleReset = () => {
    setSortField("event_start_date");
    setSortOrder("desc");
    setSelectedClubs([]);
  };

  const handleClubFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const club = event.target.value;
    if (event.target.checked) {
      setSelectedClubs([...selectedClubs, club]);
    } else {
      setSelectedClubs(selectedClubs.filter((c) => c !== club));
    }
  };

  const getFormIdFromLink = (link: string | null): string | null => {
    if (!link) {
      console.log("Google Form URL is null");
      return null;
    }
    const url = new URL(link);
    const path = url.pathname.split("/");
    const formId = path[path.length - 2];
    console.log("Google Form ID:", formId);
    return formId;
  };

  const isValidURL = (string: string): boolean => {
    try {
      const url = new URL(string);
      console.log("Parsed URL:", url);
      const isGoogleFormsUrl = url.hostname === "docs.google.com";
      console.log("Is Google Forms URL:", isGoogleFormsUrl);
      return isGoogleFormsUrl;
    } catch (error) {
      console.error("Error parsing URL:", error);
      return false;
    }
  };

  return (
    <Box width="100%" p={5} overflowX="auto">
      <Box
        width="100%"
        pb={4}
        overflowX="auto"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        {/* Search and filter controls */}
        <Input
          placeholder="Search for an event"
          value={searchTerm}
          onChange={handleSearchChange}
          mr={2}
        />
        <IconButton
          aria-label="Search events"
          icon={<SearchIcon />}
          onClick={() => console.log("Search clicked")}
          mr={2}
        />
        <IconButton
          aria-label={"Clear search"}
          icon={<CloseIcon />}
          onClick={() => setSearchTerm("")}
        />
      </Box>

      <Flex justify="space-between" mb={5}>
        <Wrap spacing={2}>
          <WrapItem>
            <Button
              backgroundColor="#006dac"
              _hover={{ backgroundColor: "#005c8c" }}
              color="white"
              size="sm"
              onClick={() => handleSort("event_title")}
            >
              Sort by Event Name{" "}
              {sortField === "event_title" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
          </WrapItem>
          <WrapItem>
            <Button
              backgroundColor="#006dac"
              _hover={{ backgroundColor: "#005c8c" }}
              color="white"
              size="sm"
              onClick={() => handleSort("event_start_date")}
            >
              Sort by Date & Time{" "}
              {sortField === "event_start_date" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
          </WrapItem>
          <WrapItem>
            <Button
              backgroundColor="#006dac"
              _hover={{ backgroundColor: "#005c8c" }}
              color="white"
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              Sort Clubs
            </Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="gray" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </WrapItem>
        </Wrap>
        <Text>Showing {sortedEvents.length} events</Text>
      </Flex>

      {/* Accordion */}
      <Accordion allowMultiple>
        {sortedEvents.map((event, index) => {
          const startDate = new Date(event.event_start_date);
          const endDate = new Date(event.event_end_date);
          const startTime = startDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const endTime = endDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const handleSignUp = () => {
            // Check if sign-up is allowed during the registration period
            const currentDate = new Date();
            const registrationStartDate = new Date(event.event_reg_start_date);
            const registrationEndDate = new Date(event.event_reg_end_date);

            if (
              currentDate < registrationStartDate ||
              currentDate > registrationEndDate
            ) {
              // Display a toast message indicating that sign-up is not possible
              toast({
                title: "Cannot Sign Up",
                description:
                  "Sign-up is only allowed during the registration period.",
                status: "warning",
                duration: 3000,
                isClosable: true,
              });

              return;
            }
            setIsSignUpModalOpen(true);
            setCurrentIndex(index);
            setSelectedEvent(event);
          };

          return (
            <AccordionItem key={event.event_uuid}>
              <h2>
                <AccordionButton
                  borderBottom="1px solid #ccc"
                  bg="#bfe6ff"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                >
                  <Box flex="3" textAlign="left" mr={2}>
                    {event.event_title}
                  </Box>
                  <Box flex="1">
                    <Text>
                      {startDate.toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} pt={2} pl={2} pr={4}>
                <Text>Description: {event.event_desc}</Text>
                <Text>Club: {event.organiser_name}</Text>
                <Text>
                  Start Date:{" "}
                  {startDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Text>
                <Text>
                  End Date:{" "}
                  {endDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Text>
                <Text>Start Time: {startTime}</Text>
                <Text>End Time: {endTime}</Text>
                <Text>Venue: {event.event_venue}</Text>

                {/* Sign-up button */}
                <Button
                  backgroundColor="#006dac"
                  _hover={{ backgroundColor: "#005c8c" }}
                  color={"white"}
                  size="sm"
                  onClick={handleSignUp}
                  isDisabled={isSignedUp(event.event_uuid)}
                  mt={4}
                >
                  Sign Up
                </Button>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Go to Calendar View button */}
      <Button
        size="sm"
        mt={2}
        backgroundColor="#006dac"
        _hover={{ backgroundColor: "#005c8c" }}
        color={"white"}
        onClick={handleGoToCalendar}
      >
        Go to Calendar View →
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={-1}>Sort Clubs</ModalHeader>
          <ModalCloseButton />
          <Box borderBottom="1px solid" borderColor="gray.400" />
          <ModalBody mt={2}>
            {clubs.map((clubName) => (
              <Box
                key={clubName}
                display="flex"
                flexDirection="row"
                alignItems="center"
                mb={2}
              >
                <Checkbox
                  value={clubName}
                  isChecked={selectedClubs.includes(clubName)}
                  onChange={handleClubFilter}
                />
                <Text ml={3}>{clubName}</Text>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl mt={4} isRequired>
                <FormLabel>Current Course Year</FormLabel>
                <Select
                  placeholder="Select current course year"
                  value={enrolmentYear}
                  onChange={(e) => setEnrolmentYear(parseInt(e.target.value))}
                >
                  {Array.from({ length: 4 }, (_, i) => i + 1).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Current Semester</FormLabel>
                <Select
                  placeholder="Select current semester"
                  value={enrolmentIntake}
                  onChange={(e) => setEnrolmentIntake(parseInt(e.target.value))}
                >
                  <option value="1">Sem 1</option>
                  <option value="2">Sem 2</option>
                </Select>
              </FormControl>
              <FormLabel mt={4}>Addtional Queries</FormLabel>
              <Box>
                {selectedEvent &&
                  (() => {
                    const googleFormUrl = selectedEvent.event_reg_google_form;
                    console.log("Google Form URL:", googleFormUrl);
                    const formId = getFormIdFromLink(googleFormUrl);
                    console.log("Google Form ID:", formId);
                    return isValidURL(googleFormUrl) ? (
                      <iframe
                        title="Google Form"
                        src={`https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`}
                        width="98%"
                        height="500"
                        style={{ margin: "10px" }}
                      ></iframe>
                    ) : (
                      <Text>
                        {googleFormUrl
                          ? "Invalid URL"
                          : "There are no additional questions for the event."}
                      </Text>
                    );
                  })()}
              </Box>

              <FormControl mt={4} isRequired>
                <FormLabel>Google Form</FormLabel>
                <Checkbox
                  isChecked={isFormFilled}
                  onChange={(e) => setIsFormFilled(e.target.checked)}
                  required
                >
                  I acknowledge that I have filled out the Google Form
                </Checkbox>
              </FormControl>
            </ModalBody>

            <Box
              alignItems="center"
              display="flex"
              justifyContent="flex-end"
              pt={1}
              pr={6}
              pb={4}
            >
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </Box>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default EventPage;
