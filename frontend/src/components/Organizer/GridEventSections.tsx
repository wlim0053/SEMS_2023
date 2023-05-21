import React from 'react';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon, RepeatIcon, ViewIcon } from '@chakra-ui/icons';

interface EventData {
  id: string;
  event: string;
  venue: string;
  club: string;
  participants: string;
  date: string;
}

interface GridEventSectionsProps {
  data: EventData[];
}

function GridEventSections({ data }: GridEventSectionsProps) {
  return (
    <>
      {data.map((event, index) => (
        <React.Fragment key={index}>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {event.event}
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {event.venue}
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {event.club}
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {event.participants}
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {event.date}
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={['center', 'space-between']} alignItems={'center'} pl={'45px'} pr={'45px'}>
            <IconButton colorScheme="blue" aria-label="View Event" icon={<ViewIcon />} size={'sm'} />
            <IconButton colorScheme="blue" aria-label="Reorganise Event" icon={<RepeatIcon />} size={'sm'} />
            <IconButton colorScheme="blue" aria-label="Delete Event" icon={<DeleteIcon />} size={'sm'} />
          </Box>
        </React.Fragment>
      ))}
    </>
  );
}

export default GridEventSections;
