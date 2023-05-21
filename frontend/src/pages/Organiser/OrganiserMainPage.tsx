import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import CalendarViewButton from '../../components/Organizer/CalendarViewButton'
import { Flex } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from 'react';
import CalendarDashboard from '../../components/Organizer/CalendarDashboard'
import GridViewButton from '../../components/Organizer/GridViewButton'
import GridEventDashboard from '../../components/Organizer/GridEventDashboard'
import GridEventDashboardPageNavigator from '../../components/Organizer/GridEventDashboardPageNavigator'



function OrganiserMainPage() {
  const [calendarViewFlag, setCalendarViewFlag] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(-1);

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
      id: "ed-1",
      event: "EXE - IMechE",
      venue: "Monash University Malaysia",
      club: "IMechE",
      participants: "5/200",
      date: "2023-05-25"
    },
    {
      id: "ed2",
      event: "EXE - ICE",
      venue: "Monash University Malaysia",
      club: "ICE",
      participants: "4/200",
      date: "2023-05-25"
    },
    {
      id: "ed-3",
      event: "EXE - SEM",
      venue: "Monash University Malaysia",
      club: "SEM",
      participants: "6/200",
      date: "2023-05-25"
    },
    {
      id: "ed-4",
      event: "Monash Hack",
      venue: "Monash University Malaysia",
      club: "SOE",
      participants: "25/60",
      date: "2023-05-28",
    },
    {
      id: "ed-5",
      event: "Mingle Night",
      venue: "Monash University Malaysia",
      club: "MUSA",
      participants: "25/60",
      date: "2023-05-25",
    },
    {
      id: "ed-6",
      event: "Cultural Festival",
      venue: "Monash University Malaysia",
      club: "MUSA",
      participants: "25/60",
      date: "2023-05-25",
    }
  ];
  
  const getSelectedEvents = (selectedEventsArr: EventData[]): void => {
    setSelectedEvent(selectedEventsArr);
  }
  
  return (
    <>
    <Box p={"20px"}>

      <Heading fontSize='6VH' fontWeight={400} fontFamily={"Franklin Gothic Medium"} color={"#006cac"} ml={"25px"} mb={"65px"}>
        Your Events
      </Heading>

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
      {calendarViewFlag ? <CalendarDashboard getSelectedEvents={getSelectedEvents} eventData={eventData}/> : <>
        <GridEventDashboard data={eventData}/>
        <GridEventDashboardPageNavigator />
      </>}
    </TabPanel>
    <TabPanel p={0}>
      {calendarViewFlag ? <CalendarDashboard getSelectedEvents={getSelectedEvents} eventData={eventData}/> : <>
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