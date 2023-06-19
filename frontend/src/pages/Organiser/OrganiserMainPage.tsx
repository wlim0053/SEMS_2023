import React from "react";
import {
  Box,
  Heading,
  IconButton,
  Input,
  Select,
  Text,
  Button,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CalendarViewButton from "../../components/Organizer/CalendarViewButton";
import GridViewButton from "../../components/Organizer/GridViewButton";
import GridEventDashboard from "../../components/Organizer/GridEventDashboard";
import GridEventDashboardPageNavigator from "../../components/Organizer/GridEventDashboardPageNavigator";
import Calendar from "../../components/Organizer/Calendar";
import { useNavigate } from "react-router-dom";

interface EventData {
  id: string;
  event: string;
  venue: string;
  club: string;
  participants: string;
  date: string;
}

interface GridEventDashboardProps {
  data: EventData[];
  formatDate: (date: string) => string;
}

function OrganiserMainPage() {
  const [calendarViewFlag, setCalendarViewFlag] = React.useState(false);
  const [selectedEvents, setSelectedEvents] = React.useState(-1);
  const navigate = useNavigate();

  type SortField = keyof EventData;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = React.useState<SortField>("event");

  const [selectedClubs, setSelectedClubs] = React.useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function toggleView() {
    setCalendarViewFlag(!calendarViewFlag);
  }

  const eventData: EventData[] = [
    {
      id: "ed-1",
      event: "MUM event",
      venue: "Monash University Malaysia",
      club: "IMechE",
      participants: "1/50",
      date: "2023-04-05",
    },
    {
      id: "ed2",
      event: "MUM event 1",
      venue: "Monash University Malaysia",
      club: "RoboGals",
      participants: "2/50",
      date: "2023-05-02",
    },
    {
      id: "ed3",
      event: "Website Launch",
      venue: "Monash University Malaysia",
      club: "Sems",
      participants: "3/50",
      date: "2023-07-08",
    },
    {
      id: "ed-6",
      event: "webisite demo client",
      venue: "Monash University Malaysia",
      club: "Organizers submodule",
      participants: "4/50",
      date: "2023-06-20",
    },
    {
      id: "ed4",
      event: "MUM event 2",
      venue: "Monash University Malaysia",
      club: "ICE",
      participants: "4/50",
      date: "2023-05-02",
    },
    {
      id: "ed5",
      event: "PI2 Presentation",
      venue: "Monash University Malaysia",
      club: "Organizers submodule",
      participants: "5/50",
      date: "2023-05-23",
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const sortEvents = (events: EventData[]): EventData[] => {
    let sortedData: EventData[] = [...events]; // Create a copy of the events array

    sortedData.sort((a, b) => {
      if (sortField === "participants") {
        const participantsA = parseInt(a[sortField].split("/")[0]);
        const participantsB = parseInt(b[sortField].split("/")[0]);

        if (sortOrder === "asc") {
          return participantsA - participantsB;
        } else {
          return participantsB - participantsA;
        }
      } else if (sortField === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else {
        return 0;
      }
    });

    return sortedData;
  };

  const filteredEvents = eventData.filter((event) => {
    const eventMatches = event.event.toLowerCase().includes(searchTerm);
    const venueMatches = event.venue.toLowerCase().includes(searchTerm);
    const clubMatches = event.club.toLowerCase().includes(searchTerm);
    return eventMatches || venueMatches || clubMatches;
  });

  const sortedEvents = sortEvents(filteredEvents);
  const currentEvents = sortedEvents.filter((event) => new Date(event.date) >= new Date());
  const pastEvents = sortedEvents.filter((event) => new Date(event.date) < new Date());

  const handleCreateEvent = () => {
    navigate("/CreateEventForm");
  };

  const handleReset = () => {
    setSortField("event");
    setSortOrder("asc");
    setSelectedClubs([]);
  };

  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <>
      <Box p={"20px"}>
        <Flex alignItems="center" justifyContent="space-between" mb="15px">
          <Flex display={"inline-block"} justifyContent={"center"}>
            <Heading
              display={"inline-block"}
              fontSize="6VH"
              fontWeight={400}
              fontFamily="Franklin Gothic Medium"
              color="#006cac"
              ml="25px"
              mb="65px"
            >
              Your Events
            </Heading>
          </Flex>
          <IconButton
            colorScheme="blue"
            aria-label="Create Event"
            icon={<AddIcon />}
            mr="25px"
            mb={20}
            onClick={handleCreateEvent}
          />
        </Flex>

        <Flex mb={"15px"}>
          <Box flex="1" ml={"25px"}>
            <Input placeholder="Search Venue, Event, or Club" onChange={handleSearch} />
          </Box>

          <Box width={"700px"} display={"flex"} justifyContent={"center"} alignItems={"center"} ml={"40px"} mr={"20px"}>
            <Text as="p" noOfLines={1}>
              Sort by:
            </Text>

            <Select
              placeholder="Please select"
              width={"200px"}
              ml={"10px"}
              mr={"10px"}
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
            >
              <option value="participants">Number of Participants</option>
              <option value="date">Date</option>
            </Select>

            <Select
              placeholder="Please select"
              width={"150px"}
              ml={"10px"}
              mr={"10px"}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
              
            </Select>

            <Button colorScheme="blue" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </Box>

          <Box width={"85px"} display="flex" justifyContent={["center", "space-between"]}>
            <CalendarViewButton calendarViewFlag={calendarViewFlag} toggleView={toggleView} />
            <GridViewButton calendarViewFlag={calendarViewFlag} toggleView={toggleView} />
          </Box>
        </Flex>

        <Tabs align="end" variant="enclosed">
          <TabList>
            <Tab>Current Events</Tab>
            <Tab>Past Events</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              {calendarViewFlag ? (
                <Calendar />
              ) : (
                <>
                  <GridEventDashboard data={currentEvents} formatDate={formatDate} />
                  <GridEventDashboardPageNavigator />
                </>
              )}
            </TabPanel>
            <TabPanel p={0}>
              {calendarViewFlag ? (
                <Calendar />
              ) : (
                <>
                  <GridEventDashboard data={pastEvents} formatDate={formatDate} />
                  <GridEventDashboardPageNavigator />
                </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default OrganiserMainPage;
