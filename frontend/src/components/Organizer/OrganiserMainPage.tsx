/* 
|| Landing Page for all Organisers
*/
import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { CalendarIcon, DeleteIcon, RepeatIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import CustomGridIcon from './CustomGridIcon';
import CalendarViewButton from './CalendarViewButton'
import { Flex, Spacer } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from 'react';
import CalendarDashboard from './CalendarDashboard'
import GridViewButton from './GridViewButton'
import GridEventDashboard from './GridEventDashboard'
import GridEventDashboardPageNavigator from './GridEventDashboardPageNavigator'
import Navbar from './navbar'



function OrganiserMainPage() {
  const [calendarViewFlag, setCalendarViewFlag] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(-1);

  function toggleView(){
    setCalendarViewFlag(!calendarViewFlag)
  }

  function getSelectedEvents(selectedEventsArr){
    setSelectedEvents(selectedEventsArr);
    console.log("click1");
    console.log(selectedEventsArr);
  }



  return (
    <>
    <Navbar/>
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
          <option value="option1">Name</option>
        </Select>

        <Button colorScheme="blue" variant="solid">
          Reset
        </Button>
      </Box>

      <Box width={"85px"} display="flex" justifyContent={["center", "space-between"]}>
        <CalendarViewButton calendarViewFlag={calendarViewFlag} toggleView={calendarViewFlag ? undefined : toggleView}/>
        <GridViewButton calendarViewFlag={calendarViewFlag} toggleView={!calendarViewFlag ? undefined : toggleView}/>
      </Box>

    </Flex>

    <Tabs align="end" variant="enclosed">
  <TabList>
    <Tab>Current Events</Tab>
    <Tab>Past Events</Tab>
  </TabList>
  <TabPanels>
    <TabPanel p={0}>
      {calendarViewFlag ? <CalendarDashboard getSelectedEvents={getSelectedEvents}/> : <>
        <GridEventDashboard />
        <GridEventDashboardPageNavigator />
      </>}
    </TabPanel>
    <TabPanel p={0}>
      {calendarViewFlag ? <CalendarDashboard getSelectedEvents={getSelectedEvents}/> : <>
        <GridEventDashboard />
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