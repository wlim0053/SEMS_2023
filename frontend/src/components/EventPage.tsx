import React, { useState } from "react";
import {
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
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CSSObject } from "@emotion/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function EventPage() {
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

  type SortField = "eventNo" | "eventName" | "dateTime" | "club";

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<SortField>("eventNo");
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const clubs = [
    { name: "IEMMSS", id: "iemmss" },
    { name: "CHEMECAR", id: "chemecar" },
    { name: "OP", id: "messi" },
    { name: "CSM", id: "cr7" },
    { name: "JJK", id: "jjk" },
  ];

  type Event = {
    eventNo: number;
    eventName: string;
    club: string;
    dateTime: Date;
    venue: string;
    description: string;
  };

  const headers = [
    "Event No.",
    "Event Name",
    "Club",
    "Date & Time",
    "Venue",
    "Description",
    "Actions",
  ];

  const tableStyles: CSSObject = {
    borderCollapse: "collapse",
    border: "2px solid #ddd",
    width: "100%",
    "& th, td": {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
    },
    "& th": {
      whiteSpace: "nowrap",
      backgroundColor: "#f2f2f2",
      fontWeight: "bold",
    },
  };

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
    setSortField("eventNo");
    setSortOrder("asc");
    setSelectedClubs([]);
  };

  const handleClubFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const club = event.target.value;
    console.log(club);
    if (event.target.checked) {
      setSelectedClubs([...selectedClubs, club]);
    } else {
      setSelectedClubs(selectedClubs.filter((c) => c !== club));
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearchTerm = event.eventName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSelectedClubs =
      selectedClubs.length === 0 || selectedClubs.includes(event.club);
    return matchesSearchTerm && matchesSelectedClubs;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortField === "eventNo") {
      return sortOrder === "asc"
        ? a.eventNo - b.eventNo
        : b.eventNo - a.eventNo;
    } else if (sortField === "eventName") {
      return sortOrder === "asc"
        ? a.eventName.localeCompare(b.eventName)
        : b.eventName.localeCompare(a.eventName);
    } else if (sortField === "dateTime") {
      return sortOrder === "asc"
        ? a.dateTime.getTime() - b.dateTime.getTime()
        : b.dateTime.getTime() - a.dateTime.getTime();
    } else {
      return sortOrder === "asc"
        ? a.club.localeCompare(b.club)
        : b.club.localeCompare(a.club);
    }
  });

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
        <Box>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => handleSort("eventName")}
            mr={2}
          >
            Sort by Event Name{" "}
            {sortField === "eventName" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => handleSort("dateTime")}
            mr={2}
          >
            Sort by Date & Time{" "}
            {sortField === "dateTime" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            colorScheme="blue"
            size="sm"
            mr={2}
            onClick={() => setIsModalOpen(true)}
          >
            Sort Clubs
          </Button>
          <Button colorScheme="gray" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </Box>
        <Text>Showing {sortedEvents.length} events</Text>
      </Flex>
      <Table variant="simple" size="md" width="auto" mx="auto" sx={tableStyles}>
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
                onClick={() => handleSort(header as SortField)}
              >
                {header}{" "}
                {sortField === header && (sortOrder === "asc" ? "↑" : "↓")}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedEvents.map((event) => (
            <Tr key={event.eventNo}>
              <Td>{event.eventNo}</Td>
              <Td>{event.eventName}</Td>
              <Td>{event.club}</Td>
              <Td>
                <Text as="time" dateTime={event.dateTime.toISOString()}>
                  {event.dateTime.toLocaleString()}
                </Text>
              </Td>
              <Td>{event.venue}</Td>
              <Td>{event.description}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        size="sm"
        mt={2}
        colorScheme={"blue"}
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
