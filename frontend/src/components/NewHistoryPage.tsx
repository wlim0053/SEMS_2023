import { CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { Heading, useToast } from "@chakra-ui/react";
import api from "../utils/api";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Button,
  Input,
  Flex,
  IconButton,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Checkbox,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

function NewHistoryPage() {
  // Fetches participated events from the database
  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const response = await api.get("/participation");
        let data = response.data;
        console.log(response.data);
        const eventsTemp: PastEvent[] = [];
        for (let i = 0; i < data["length"]; i++) {
          const currentEvent_uuid = data[i]["event_uuid"];
          let eventResponse = await api.get(`/event/${currentEvent_uuid}`);
          let eventData = eventResponse.data[0];
          console.log(eventResponse);
          const event: PastEvent = {
            eventNo: i + 1,
            eventName: eventData["event_title"],
            club: eventData["organiser_name"],
            dateTime: new Date(eventData["event_start_date"]),
          };
          eventsTemp.push(event);
          console.log(event);
          setEvents(eventsTemp);
        }
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };
    fetchParticipations();
  }, []);

  // Fetches clubs from the database
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get("/organiser");
        let data = response.data;
        console.log(data);
        const clubsTemp: string[] = [];
        for (let i = 0; i < data["length"]; i++) {
          const club = data[i]["organiser_name"];
          clubsTemp.push(club);
        }
        setClubs(clubsTemp);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };
    fetchClubs();
  }, []);

  // Example event data
  // const events: PastEvent[] = [
  // {
  //   eventNo: 1,
  //   eventName: "Sustainability, Safety, Chem or Not?",
  //   club: "IEMMSS",
  //   dateTime: new Date("2023-05-06T10:00:00"),
  // },
  // {
  //   eventNo: 2,
  //   eventName:
  //     "Beyond the Blue Skies: The Exciting Frontier of Aerospace Engineering",
  //   club: "IEMMSS",
  //   dateTime: new Date("2023-05-13T14:00:00"),
  // },
  // {
  //   eventNo: 3,
  //   eventName: "ChemE Car Workshop",
  //   club: "CHEMECAR",
  //   dateTime: new Date("2023-05-06T09:00:00"),
  // },
  // ];

  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<
    "eventNo" | "eventName" | "dateTime" | "club"
  >("eventNo");
  const [events, setEvents] = useState<PastEvent[]>([]);
  const [clubs, setClubs] = useState<string[]>([]);

  // Defining Past events
  type PastEvent = {
    eventNo: number;
    eventName: string;
    club: string;
    dateTime: Date;
  };
  // Example club data
  // const clubs = [
  //   { name: "IEMMSS", id: "iemmss" },
  //   { name: "CHEMECAR", id: "chemecar" },
  //   { name: "OP", id: "messi" },
  //   { name: "CSM", id: "cr7" },
  //   { name: "JJK", id: "jjk" },
  // ];

  // Table Styling
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
  // Responsible for handling search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Responsible for club filtering
  const handleClubFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const club = event.target.value;
    console.log(club);
    if (event.target.checked) {
      setSelectedClubs([...selectedClubs, club]);
    } else {
      setSelectedClubs(selectedClubs.filter((c) => c !== club));
    }
  };

  // Filter events based on search term and selected clubs
  const filteredEvents = events.filter((event) => {
    const matchesSearchTerm = event.eventName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSelectedClubs =
      selectedClubs.length === 0 || selectedClubs.includes(event.club);
    return matchesSearchTerm && matchesSelectedClubs;
  });

  // Handle sorting by specific fields
  const handleSort = (field: "eventNo" | "eventName" | "dateTime" | "club") => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Sort filtered events based on sort field and order
  const sortedEvents = filteredEvents.sort((a, b) => {
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

  // Toast to replace a pop up window
  const toast = useToast();

  // Table frontend
  return (
    <Box width="100%" p={5} overflowX="auto">
      <Heading color="#006DAE">Past Events Joined</Heading>
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
            mr={2}
            onClick={() => setIsModalOpen(true)}
          >
            Sort Clubs
          </Button>
        </Box>
      </Flex>
      <Table variant="simple" size="md" width="auto" mx="auto" sx={tableStyles}>
        <Thead>
          <Tr>
            <Th>Event No.</Th>
            <Th onClick={() => handleSort("eventName")}>
              Event Name{" "}
              {sortField === "eventName" && (sortOrder === "asc" ? "↑" : "↓")}
            </Th>
            <Th>Club</Th>
            <Th onClick={() => handleSort("dateTime")}>
              Date & Time{" "}
              {sortField === "dateTime" && (sortOrder === "asc" ? "↑" : "↓")}
            </Th>
            <Th>Action</Th>
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
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() =>
                    toast({
                      title: "Feedback Received",
                      description: "Thank you for your feedback :)",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    })
                  }
                >
                  Provide Feedback
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={-1}>Sort Clubs</ModalHeader>
          <ModalCloseButton />
          <Box borderBottom="1px solid" borderColor="gray.400" />
          <ModalBody mt={2}>
            {clubs.map((club) => (
              <Box
                key={club}
                display="flex"
                flexDirection="row"
                alignItems="center"
                mb={2}
              >
                <Checkbox
                  value={club}
                  isChecked={selectedClubs.includes(club)}
                  onChange={handleClubFilter}
                />
                <Text ml={3}>{club}</Text>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default NewHistoryPage;
