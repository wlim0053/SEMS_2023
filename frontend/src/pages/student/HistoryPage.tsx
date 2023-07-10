import { CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { Heading, useToast } from "@chakra-ui/react";
import api from "../../utils/api";
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
import FeedbackForm from "../../components/student/FeedbackForm";

function HistoryPage() {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<
    "eventNo" | "eventName" | "dateTime" | "club"
  >("eventNo");
  const [events, setEvents] = useState<Object[]>([]);
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PastEvent>();

  // Fetches participated events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let eventResponse = await api.get(`/event/for-student?event_status=C`);
        let data = eventResponse.data;
        console.log(data);
        let eventTemp: Object[] = [];
        // for (let i in data) {
        //   eventTemp.push(data[i]);
        // }
        setEvents(data);
        console.log(data);

        const uniqueClubIds: string[] = [
          ...new Set(data.map((event: Event) => event["organiser_uuid"])),
        ] as string[];

        const uniqueClubNames: string[] = [
          ...new Set(data.map((event: Event) => event["organiser_name"])),
        ] as string[];

        let uniqueClubs: Club[] = [];
        for (let i in uniqueClubIds) {
          const club: Club = {
            id: uniqueClubIds[i],
            name: uniqueClubNames[i],
          };
          uniqueClubs.push(club);
        }

        setClubs(uniqueClubs);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const response = await api.get("/participation?event_status=C");
        let data = response.data;
        console.log(response.data);
        const eventsTemp: PastEvent[] = [];
        for (let i = 0; i < data["length"]; i++) {
          const currentOrg_uuid = data[i]["organiser_uuid"];
          let organiserName = "";
          for (let j in clubs) {
            console.log("club:", clubs[j]);
            console.log("org_uuid:", currentOrg_uuid);
            if (clubs[j].id == currentOrg_uuid) {
              organiserName = clubs[j].name;
            }
          }
          let attendance = data[i]["participation_attendance"];
          if (attendance) {
            const event: PastEvent = {
              participation_uuid: data[i]["participation_uuid"],
              eventNo: i + 1,
              eventName: data[i]["event_title"],
              club: organiserName,
              dateTime: new Date(data[i]["event_start_date"]),
              feedbackGiven: !!data[i]["feedback_uuid"],
            };
            eventsTemp.push(event);
            console.log(event);
          }
        }
        setPastEvents(eventsTemp);
        console.log("events", pastEvents);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };
    fetchParticipations();
  }, [clubs, events]);

  // Fetches clubs from the database
  // useEffect(() => {
  //   const fetchClubs = async () => {
  //     try {
  //       const response = await api.get("/organiser");
  //       let data = response.data;
  //       console.log(data);
  //       const clubsTemp: string[] = [];
  //       for (let i = 0; i < data["length"]; i++) {
  //         const club = data[i]["organiser_name"];
  //         clubsTemp.push(club);
  //       }
  //       setClubs(clubsTemp);
  //     } catch (err) {
  //       console.log(`Error: ${err}`);
  //     }
  //   };
  //   fetchClubs();
  // }, []);

  // Example event data
  // const events: PastEvent[] = [
  //   {
  //     participation_uuid: "1",
  //     eventNo: 1,
  //     eventName: "Sustainability, Safety, Chem or Not?",
  //     club: "IEMMSS",
  //     dateTime: new Date("2023-05-06T10:00:00"),
  //     feedbackGiven: true,
  //   },
  //   {
  //     participation_uuid: "2",
  //     eventNo: 2,
  //     eventName:
  //       "Beyond the Blue Skies: The Exciting Frontier of Aerospace Engineering",
  //     club: "IEMMSS",
  //     dateTime: new Date("2023-05-13T14:00:00"),
  //     feedbackGiven: false,
  //   },
  //   {
  //     participation_uuid: "3",
  //     eventNo: 3,
  //     eventName: "ChemE Car Workshop",
  //     club: "CHEMECAR",
  //     dateTime: new Date("2023-05-06T09:00:00"),
  //     feedbackGiven: false,
  //   },
  // ];

  // Defining Past events
  type PastEvent = {
    participation_uuid: string;
    eventNo: number;
    eventName: string;
    club: string;
    dateTime: Date;
    feedbackGiven: Boolean;
  };

  type Club = {
    id: string;
    name: string;
  };
  // Example club data
  // const clubs = [
  //   { name: "IEMMSS", id: "iemmss" },
  //   { name: "CHEMECAR", id: "chemecar" },
  //   { name: "OP", id: "messi" },
  //   { name: "CSM", id: "cr7" },
  //   { name: "JJK", id: "jjk" },
  // ];
  // const clubs = ["IEMMSS", "CHEMECAR", "OP", "CSM", "JJK", "MUMTEC"];

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
  const filteredEvents = pastEvents.filter((event) => {
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
    <>
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
        <Table
          variant="simple"
          size="md"
          width="auto"
          mx="auto"
          sx={tableStyles}
        >
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
                  {event.feedbackGiven === true ? (
                    <Text>None</Text>
                  ) : (
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() =>
                        // toast({
                        //   title: "Feedback Received",
                        //   description: "Thank you for your feedback :)",
                        //   status: "success",
                        //   duration: 9000,
                        //   isClosable: true,
                        // })
                        {
                          setSelectedEvent(event);
                          setFeedbackModal(true);
                        }
                      }
                    >
                      Provide Feedback
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal
        isOpen={feedbackModal}
        onClose={() => setFeedbackModal(false)}
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <FeedbackForm
              eventTitle={selectedEvent ? selectedEvent.eventName : ""}
              participationID={
                selectedEvent ? selectedEvent.participation_uuid : ""
              }
            />
          </ModalBody>
        </ModalContent>
      </Modal>

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
    </>
  );
}

export default HistoryPage;
