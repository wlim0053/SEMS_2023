import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Grid } from '@chakra-ui/react';
import GridEventSections from './GridEventSections';

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

interface GridEventDashboardProps {
  data: EventData[];
  formatDate: (date: string) => string;
  updateEventData: () => void;
}

function GridEventDashboard({ data, updateEventData  }: GridEventDashboardProps) {
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

        <GridEventSections data={data} updateEventData={updateEventData}/>
      </Grid>
    </Box>
  );
}

export default GridEventDashboard;
