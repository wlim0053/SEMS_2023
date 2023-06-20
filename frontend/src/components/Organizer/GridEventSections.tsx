import React from 'react';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";

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

interface GridEventSectionsProps {
  data: EventData[];
}

function GridEventSections({ data }: GridEventSectionsProps) {
  const navigate = useNavigate();

  const handleViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    const eventData = data[index];
    navigate('/EventDetailsDashboard', {
      state: { eventData },
    });
  };

  const handleEditClick = () => {
    navigate("/CreateEventForm");
  };
  return (
    <>
      {data.map((event, index) => (
        <React.Fragment key={index}>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {event.event_title}
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {event.event_venue}
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {event.organiser_name}
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {"event.participants" /* Kidd:: Need to understand how to get all participants and then get all their numbers */ }
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'16px'} fontFamily={'Arial'} textAlign={'center'}>
              {new Date(event.event_start_date).toLocaleDateString(
            "en-US",
            { month: "numeric", day: "numeric", year: "numeric" }
          )}
            </Text>
          </Box>
          <Box w="100%" h="71" bg={index % 2 === 0 ? '#FFFFFF' : '#EDEEEE'} display="flex" justifyContent={['center', 'space-between']} alignItems={'center'} pl={'45px'} pr={'45px'}>
            <IconButton colorScheme="blue" aria-label="View Event" icon={<ViewIcon />} size={'sm'} onClick={handleViewClick} data-index={index}/>
            <IconButton colorScheme="blue" aria-label="Edit Event" icon={<EditIcon />} size={'sm'} onClick={handleEditClick}/>
            <IconButton colorScheme="blue" aria-label="Delete Event" icon={<DeleteIcon />} size={'sm'} />
          </Box>
        </React.Fragment>
      ))}
    </>
  );
}

export default GridEventSections;
