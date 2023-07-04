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

function OrganiserMainPage() {
  const [calendarViewFlag, setCalendarViewFlag] = useState(false);
  const navigate = useNavigate();

  type SortField = keyof EventData;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<SortField>("event_title");

  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [refreshGrid, setRefreshGrid] = useState(false);
  
  const fetchEventsFromDatabase = async () => {
    const response = await api.get("/event/for-organiser");
    console.log(response.data);
    return response.data;
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

  useEffect(() => {
    if (refreshGrid) {
      fetchEventsFromDatabase()
        .then((data) => {
          setEventData(data);
          setRefreshGrid(false); // Reset refreshGrid back to false
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
          setRefreshGrid(false); // Reset refreshGrid back to false even on error
        });
    }
  }, [refreshGrid]);

  function toggleView() {
    setCalendarViewFlag(!calendarViewFlag);
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const sortEvents = (events: EventData[]): EventData[] => {
    let sortedData: EventData[] = [...events]; // Create a copy of the events array

    sortedData.sort((a, b) => {
      if (sortField === "no_participants") {
        const participantsA = a.no_participants;
        const participantsB = b.no_participants;

        if (sortOrder === "asc") {
          return participantsA - participantsB;
        } else {
          return participantsB - participantsA;
        }
      } 

      if (sortField === "event_start_date") {
        const dateA = new Date(a.event_start_date);
        const dateB = new Date(b.event_start_date);
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      if (sortField === "event_status") {
        const statusA = a.event_status.toLowerCase();
        const statusB = b.event_status.toLowerCase();
        return sortOrder === "asc"
          ? statusA.localeCompare(statusB)
          : statusB.localeCompare(statusA);
      } 
      
      return 0;
    });

    return sortedData;
  };

  const filteredEvents = eventData.filter((event) => {
    const eventMatches = event.event_title.toLowerCase().includes(searchTerm);
    const venueMatches = event.event_venue.toLowerCase().includes(searchTerm);
    return eventMatches || venueMatches;
  });

  const sortedEvents = sortEvents(filteredEvents);
  const currentEvents = sortedEvents.filter(
    (event) => new Date(event.event_start_date) >= new Date()
  );
  const pastEvents = sortedEvents.filter(
    (event) => new Date(event.event_start_date) < new Date()
  );

  const handleCreateEvent = () => {
    navigate("/CreateEventPage"); 
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
              placeholder="Search Venue or Event"
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
              <option value="no_of_participants">Number of Participants</option>
              <option value="event_start_date">Date</option>
              <option value="event_status">Event Status</option>
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
                  setRefreshGrid={setRefreshGrid}
                />
              </TabPanel>
              <TabPanel p={0}>
                <GridEventDashboard
                  data={pastEvents}
                  formatDate={formatDate}
                  setRefreshGrid={setRefreshGrid}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Calendar setRefreshGrid={setRefreshGrid}/>
        )}
      </Box>
    </>
  );
}

export default OrganiserMainPage;
