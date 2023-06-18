import { Box, Heading, IconButton  } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import CalendarViewButton from '../../components/Organizer/CalendarViewButton'
import { AddIcon } from '@chakra-ui/icons';
import { Flex } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from 'react';
import GridViewButton from '../../components/Organizer/GridViewButton'
import GridEventDashboard from '../../components/Organizer/GridEventDashboard'
import GridEventDashboardPageNavigator from '../../components/Organizer/GridEventDashboardPageNavigator'
import Calendar from '../../components/Organizer/Calendar'
import { useNavigate } from 'react-router-dom';



function OrganiserMainPage() {
  const [calendarViewFlag, setCalendarViewFlag] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(-1);
  const navigate = useNavigate();


  function toggleView(){
    setCalendarViewFlag(!calendarViewFlag)
  }
  interface EventData {
    id: string;
    event: string;
    venue: string;
    club: string;
    participants: string;
    date: string;
  }
  
  const [selectedEvent, setSelectedEvent] = useState<EventData[] | null>(null); // Initialize state to be null or an array of EventData
  
  const eventData: EventData[] = [
    {
      id: "ed3",
      event: "PI2 Presentation",
      venue: "Monash University Malaysia",
      club: "Organizers submodule",
      participants: "70/200",
      date: "2023-05-23"
    },
    {
      id: "ed-1",
      event: "MUM event",
      venue: "Monash University Malaysia",
      club: "IMechE",
      participants: "5/200",
      date: "2023-04-05"
    },
    {
      id: "ed2",
      event: "MUM event 2",
      venue: "Monash University Malaysia",
      club: "ICE",
      participants: "4/200",
      date: "2023-05-02"
    }

  ];
  
  const getSelectedEvents = (selectedEventsArr: EventData[]): void => {
    setSelectedEvent(selectedEventsArr);
  }

  const handleCreateEvent = () => {
    navigate('/CreateEventForm');
  };
  
  return (
    <>
    <Box p={"20px"}>

    <Flex alignItems="center" justifyContent="space-between" mb="15px">
          <Flex display={'inline-block'} justifyContent={'center'}>
            <Heading display={'inline-block'} fontSize='6VH' fontWeight={400} fontFamily="Franklin Gothic Medium" color="#006cac" ml="25px" mb="65px">
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
        <Input placeholder="Search" />
      </Box>

      <Box width={"400px"} display={"flex"} justifyContent={"center"} alignItems={"center"} ml={"40px"} mr={"20px"}>
        <Text as="p" noOfLines={1}>Sort by:</Text>

        <Select placeholder="Please select" width={"200px"} ml={"10px"} mr={"10px"}>
          <option value="sort_by_event">Event</option>
          <option value="sort_by_venue">Venue</option>
          <option value="sort_by_club">Club</option>
          <option value="sort_by_participants_number">Number of Participants</option>
          <option value="sort_by_date">Date</option>
        </Select>

        <Button colorScheme="blue" variant="solid">
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
      {calendarViewFlag ? <Calendar/> : <>
        <GridEventDashboard data={eventData}/>
        <GridEventDashboardPageNavigator />
      </>}
    </TabPanel>
    <TabPanel p={0}>
      {calendarViewFlag ? <Calendar/> : <>
        <GridEventDashboard data={eventData}/>
        <GridEventDashboardPageNavigator />
      </>}
    </TabPanel>
  </TabPanels>
</Tabs>

    </Box>
    </>
    
  )
}

export default OrganiserMainPage