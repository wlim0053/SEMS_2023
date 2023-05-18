import React from 'react';
import { VStack } from '@chakra-ui/react';
import EventCards from './EventCards';

interface EventData {
  id: string;
  event: string;
  venue: string;
  club: string;
  participants: string;
  date: string;
}

interface CalendarEventNavigatorProps {
  events: EventData[];
}

const CalendarEventNavigator: React.FC<CalendarEventNavigatorProps> = ({ events }) => {
  return (
    <VStack spacing={4} align="stretch">
      {events && events.map((event) => (
        <EventCards
          key={event.id}
          eventName={event.event}
          venue={event.venue}
          club={event.club}
          participants={event.participants}
          date={event.date}
        />
      ))}
    </VStack>
  );
}

export default CalendarEventNavigator;
