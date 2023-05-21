import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Grid } from '@chakra-ui/react';
import GridEventSections from './GridEventSections';

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
}

function GridEventDashboard({ data }: GridEventDashboardProps) {
  return (
    <Box mt="20px">
      <Grid templateColumns="repeat(6, 1fr)" gap={0.5}>
        <Box w="100%" h="75" bg="#DFE1E4" display="flex" justifyContent={'center'} pb={'8px'}>
          <Text mt={'auto'} fontWeight={'700'} fontSize={'16px'} fontFamily={'Arial'}>
            Event
          </Text>
        </Box>
        <Box w="100%" h="75" bg="#DFE1E4" display="flex" justifyContent={'center'} pb={'8px'}>
          <Text mt={'auto'} fontWeight={'700'} fontSize={'16px'} fontFamily={'Arial'}>
            Venue
          </Text>
        </Box>
        <Box w="100%" h="75" bg="#DFE1E4" display="flex" justifyContent={'center'} pb={'8px'}>
          <Text mt={'auto'} fontWeight={'700'} fontSize={'16px'} fontFamily={'Arial'}>
            Club
          </Text>
        </Box>
        <Box w="100%" h="75" bg="#DFE1E4" display="flex" justifyContent={'center'} pb={'8px'}>
          <Text mt={'auto'} fontWeight={'700'} fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
            Number of Participants
          </Text>
        </Box>
        <Box w="100%" h="75" bg="#DFE1E4" display="flex" justifyContent={'center'} pb={'8px'}>
          <Text mt={'auto'} fontWeight={'700'} fontSize={'16px'} fontFamily={'Arial'}>
            Date
          </Text>
        </Box>
        <Box w="100%" h="75" bg="#DFE1E4" display="flex" justifyContent={'center'} pb={'8px'}>
          <Text mt={'auto'} fontWeight={'700'} fontSize={'16px'} fontFamily={'Arial'}>
            Actions
          </Text>
        </Box>

        <GridEventSections data={data}/>
      </Grid>
    </Box>
  );
}

export default GridEventDashboard;
