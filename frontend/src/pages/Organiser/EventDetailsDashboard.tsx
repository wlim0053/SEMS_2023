import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Grid,
} from "@chakra-ui/react";

import fakeQRCode from "../../../public/fake-qrcode.jpg";

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

const EventDetailsDashboard = () => {
  const location = useLocation();
  const eventData: EventData = location.state.eventData;
  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Event Details
      </Heading>

      <Box borderWidth={1} borderRadius="md" boxShadow="md" p={4} mb={4}>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Name: 
        </Text>
        <Text>{eventData.event_title}</Text>

        <Text fontWeight="bold" fontSize="lg" mt={4} mb={2}>
          Description: 
        </Text>
        <Text>{eventData.event_desc}</Text>

        <Flex alignItems="center" mt={4} mb={2}>
          <Text fontWeight="bold" marginRight={2} fontSize="lg">
            Date:
          </Text>
          <Text fontSize="lg">{eventData.event_start_date}</Text>
        </Flex>

        <Flex alignItems="center">
          <Text fontWeight="bold" marginRight={2} fontSize="lg">
            Time:
          </Text>
          <Text fontSize="lg">{}</Text>
        </Flex>
      </Box>

      <Grid
        templateColumns="1fr 1fr"
        gap={4}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        p={4}
        mb={4}
      >
        <Box>
          <Flex alignItems="center" mb={2}>
            <Text fontWeight="bold" marginRight={2} fontSize="lg">
              Capacity:
            </Text>
            <Text fontSize="lg">{eventData.event_capacity}</Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontWeight="bold" mb={2} marginRight={2} fontSize="lg">
              Venue:
            </Text>
            <Text fontSize="lg">{eventData.event_venue}</Text>
          </Flex>

          <Flex alignItems="center" mb={2}>
            <Text fontWeight="bold" marginRight={2} fontSize="lg">
              Recurring:
            </Text>
            <Text fontSize="lg">{}</Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontWeight="bold" marginRight={2} fontSize="lg">
              Links and QR Code:
            </Text>
            <Text fontSize="lg">{eventData.event_reg_google_form}</Text>
          </Flex>
        </Box>
        <Box>
          <Text fontWeight="bold" marginBottom={2} fontSize="lg" mt={4}>
            Event Statistics:
          </Text>

          <VStack spacing={2} alignItems="start" pl={4}>
            <HStack>
              <Text fontWeight="bold" fontSize="md">
                Number of Males:
              </Text>
              <Badge colorScheme="blue">{}</Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="md">
                Number of Females:
              </Text>
              <Badge colorScheme="pink">{}</Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="md">
                Number of Engineering Specialization:
              </Text>
              <Badge colorScheme="green">
                {}
              </Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="md">
                Number of Medicine Specialization:
              </Text>
              <Badge colorScheme="red">
                {}
              </Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="md">
                Number of Arts Specialization:
              </Text>
              <Badge colorScheme="purple">
                {}
              </Badge>
            </HStack>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default EventDetailsDashboard;
