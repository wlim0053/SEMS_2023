import { useEffect, useState } from "react";
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
import Calendar from "../../components/Organizer/Calendar";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

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

function OrganiserMainPage() {
  const [calendarViewFlag, setCalendarViewFlag] = useState(false);
  const navigate = useNavigate();

  type SortField = keyof EventData;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<SortField>("event_title");

  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [eventData, setEventData] = useState<EventData[]>([]);

  const fetchEventsFromDatabase = async () => {
    const response = await api.get("/event/for-organiser");
    console.log(response.data);
    return response.data;
  };

  const updateEventData = () => {
    fetchEventsFromDatabase()
      .then((data) => {
        setEventData(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  useEffect(() => {
    fetchEventsFromDatabase()
      .then((data) => {
        setEventData(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  function toggleView() {
    setCalendarViewFlag(!calendarViewFlag);
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const sortEvents = (events: EventData[]): EventData[] => {
    let sortedData: EventData[] = [...events]; // Create a copy of the events array

    sortedData.sort((a, b) => {
      // Kidd:: Need to ask Kennedy and understand how to get participation
      /* 
      if (sortField === "participants") {
        const participantsA = parseInt(a[sortField].split("/")[0]);
        const participantsB = parseInt(b[sortField].split("/")[0]);

        if (sortOrder === "asc") {
          return participantsA - participantsB;
        } else {
          return participantsB - participantsA;
        }
      } */
      if (sortField === "event_start_date") {
        const dateA = new Date(a.event_start_date);
        const dateB = new Date(b.event_start_date);
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else {
        return 0;
      }
    });

    return sortedData;
  };

  const filteredEvents = eventData.filter((event) => {
    const eventMatches = event.event_title.toLowerCase().includes(searchTerm);
    const venueMatches = event.event_venue.toLowerCase().includes(searchTerm);
    const clubMatches = event.organiser_name.toLowerCase().includes(searchTerm); // Kidd:: Apparently organiser_name is club name (Need to confirm)
    return eventMatches || venueMatches || clubMatches;
  });

  const sortedEvents = sortEvents(filteredEvents);
  const currentEvents = sortedEvents.filter(
    (event) => new Date(event.event_start_date) >= new Date()
  );
  const pastEvents = sortedEvents.filter(
    (event) => new Date(event.event_start_date) < new Date()
  );

  const handleCreateEvent = () => {
    navigate("/CreateEventForm", { state: { eventData: null } }); // If it's null, /CreateEventForm can recognize that component is called for creation.
  };

  const handleReset = () => {
    setSortField("event_title");
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
          <Box
            flex="1"
            display={!calendarViewFlag ? "block" : "none"}
            ml={"25px"}
          >
            <Input
              placeholder="Search Venue, Event, or Club"
              onChange={handleSearch}
            />
          </Box>

          <Box
            width={!calendarViewFlag ? "700px" : "0px"}
            display={!calendarViewFlag ? "flex" : "none"}
            justifyContent={"center"}
            alignItems={"center"}
            ml={"40px"}
            mr={"20px"}
          >
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

          <Box flex="1" />

          <Box width={"85px"} display="flex" justifyContent="flex-end">
            <CalendarViewButton
              calendarViewFlag={calendarViewFlag}
              toggleView={toggleView}
            />
            <GridViewButton
              calendarViewFlag={calendarViewFlag}
              toggleView={toggleView}
            />
          </Box>
        </Flex>
        {!calendarViewFlag ? (
          <Tabs align="end" variant="enclosed">
            <TabList>
              <Tab>Current Events</Tab>
              <Tab>Past Events</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <GridEventDashboard
                  data={currentEvents}
                  formatDate={formatDate}
                  updateEventData={updateEventData}
                />
              </TabPanel>
              <TabPanel p={0}>
                <GridEventDashboard
                  data={pastEvents}
                  formatDate={formatDate}
                  updateEventData={updateEventData}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Calendar eventData={eventData} />
        )}
      </Box>
    </>
  );
}

export default OrganiserMainPage;
