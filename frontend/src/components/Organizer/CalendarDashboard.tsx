import EventCalendar from './EventCalendar';
import { Grid, GridItem } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { useState } from 'react';
import { Heading } from '@chakra-ui/react';
import CalendarEventNavigator from './CalendarEventNavigator';

interface EventData {
  id: string;
  event: string;
  venue: string;
  club: string;
  participants: string;
  date: string;
}

interface CalendarDashboardProps {
  getSelectedEvents: (selectedEventsArr: EventData[]) => void;
  eventData: EventData[]; 
}

const CalendarDashboard: React.FC<CalendarDashboardProps> = ({ getSelectedEvents, eventData }) => {
  const [selectedEvents, setSelectedEvents] = useState<EventData[]>([]);

  const handleSelectedEvents = (newEvents: EventData[]) => {
    setSelectedEvents(newEvents);
  }

  return (
    <Grid
      mt="20px"
      h={'760px'}
      templateColumns="1fr 1px 300px 1px"
      templateRows="1px 40px 1fr 1px"
      templateAreas={`
        "HorizontalDivider1 HorizontalDivider1 HorizontalDivider1 VerticalDivider2"
        "EventCalendar VerticalDivider1 EventHeader VerticalDivider2"
        "EventCalendar VerticalDivider1 CalendarEventNavigator VerticalDivider2"
        "HorizontalDivider2 HorizontalDivider2 HorizontalDivider2 HorizontalDivider2"
      `}
    >
      <Divider borderColor="gray.200" gridArea="HorizontalDivider1" />
      <Divider borderColor="gray.200" borderWidth="1px" gridArea="HorizontalDivider2" />

      <GridItem area="EventCalendar">
        <EventCalendar handleSelectedEvents={handleSelectedEvents} eventData={eventData} />
      </GridItem>

      <Divider orientation="vertical" borderWidth="1px" borderColor="gray.200" gridArea="VerticalDivider1" />
      <Divider orientation="vertical" borderColor="gray.200" gridArea="VerticalDivider2" h="100%" />

      <GridItem area="EventHeader" bg="blue.100" display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Heading color={'gray.700'} size={'md'}>
          Events Happening:
        </Heading>
      </GridItem>
      
      <GridItem area="CalendarEventNavigator" bg="white" overflowY="scroll" maxHeight="760px" display={'flex'} justifyContent={'center'}>
        <CalendarEventNavigator events={selectedEvents} />
      </GridItem>
    </Grid>
  );
}

export default CalendarDashboard;
