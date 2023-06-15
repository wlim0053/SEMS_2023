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
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

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
    | "event_venue"
    | "organiser_name";

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<SortField>("event_start_date");
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [sortedEvents, setSortedEvents] = useState<Event[]>([]);

  const clubs = [
    { name: "IEMMSS", id: "iemmss" },
    { name: "CHEMECAR", id: "chemecar" },
    { name: "OP", id: "messi" },
    { name: "CSM", id: "cr7" },
    { name: "JJK", id: "jjk" },
    { name: "MUMTEC", id: "mumtec" },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/event");
        const data = await response.json();
        setEvents(data);
        setSortedEvents(data);
        setSignUpStatus(new Array(data.length).fill(false));
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents().catch((error) => console.error(error));
  }, []);

  const navigate = useNavigate();

  const handleGoToCalendar = () => {
    navigate("/StudentHome");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleReset = () => {
    setSortField("event_start_date");
    setSortOrder("asc");
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

  const filteredEvents = events.filter((event) => {
    const matchesSearchTerm = event.event_title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSelectedClubs =
      selectedClubs.length === 0 ||
      selectedClubs.includes(event.organiser_name);
    return matchesSearchTerm && matchesSelectedClubs;
  });

  useEffect(() => {
    const sortEvents = (a: Event, b: Event) => {
      switch (sortField) {
        case "event_start_date":
          return sortOrder === "asc"
            ? new Date(a.event_start_date).getTime() -
                new Date(b.event_start_date).getTime()
            : new Date(b.event_start_date).getTime() -
                new Date(a.event_start_date).getTime();
        case "event_title":
          return sortOrder === "asc"
            ? a.event_title.localeCompare(b.event_title)
            : b.event_title.localeCompare(a.event_title);
        case "event_venue":
          return sortOrder === "asc"
            ? a.event_venue.localeCompare(b.event_venue)
            : b.event_venue.localeCompare(a.event_venue);
        default:
          return sortOrder === "asc"
            ? a.organiser_name.localeCompare(b.organiser_name)
            : b.organiser_name.localeCompare(a.organiser_name);
      }
    };

    const sorted = [...filteredEvents].sort(sortEvents);
    setSortedEvents(sorted);
  }, [filteredEvents, sortField, sortOrder]);

  const [signUpStatus, setSignUpStatus] = useState<boolean[]>(
    Array(sortedEvents.length).fill(false)
  );

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
          const startTime = startDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const endTime = endDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
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
                    <Text>
                      {startDate.toLocaleString("en-US", {
                        month: "numeric",
                        day: "numeric",
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

                {/* Sign-up button */}
                <Button
                  backgroundColor="#006dac"
                  _hover={{ backgroundColor: "#005c8c" }}
                  color={"white"}
                  size="sm"
                  onClick={() => {
                    setIsSignUpModalOpen(true);
                    setCurrentIndex(index);
                  }}
                  isDisabled={signUpStatus[index]}
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
            {clubs.map((club) => (
              <Box
                key={club.id}
                display="flex"
                flexDirection="row"
                alignItems="center"
                mb={2}
              >
                <Checkbox
                  value={club.name}
                  isChecked={selectedClubs.includes(club.name)}
                  onChange={handleClubFilter}
                />
                <Text ml={3}>{club.name}</Text>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSignUpModalOpen(false);
              setSignUpStatus((prevStatus) =>
                prevStatus.map((status, i) =>
                  i === currentIndex ? true : status
                )
              );
              console.log("Submit clicked");
            }}
          >
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input />
                <FormErrorMessage>Name is required.</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" />
                <FormErrorMessage>Email is required.</FormErrorMessage>
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
