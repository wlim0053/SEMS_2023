import React from 'react';
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
} from '@chakra-ui/react';

import fakeQRCode from '../../../public/fake-qrcode.jpg';

interface EventDetailsProps {
  name: string;
  description: string;
  date: string;
  time: string;
  capacity: number;
  venue: string;
  recurring: boolean;
  eventStatistics: {
    gender: {
      male: number;
      female: number;
    };
    specialization: {
      engineering: number;
      medicine: number;
      arts: number;
    };
  };
}

const EventDetailsDashboard: React.FC<EventDetailsProps> = ({
  name,
  description,
  date,
  time,
  capacity,
  venue,
  recurring,
  eventStatistics,
}) => {
  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Event Details
      </Heading>

      <Box borderWidth={1} borderRadius="md" boxShadow="md" p={4} mb={4}>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          Name: PI 2 presentation
        </Text>
        <Text>{name}</Text>

        <Text fontWeight="bold" fontSize="lg" mt={4} mb={2}>
          Description:
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, ratione nisi repudiandae, consequuntur repellendus, recusandae dolore alias itaque voluptatum quae expedita mollitia! Illo sed, velit nostrum quaerat nesciunt dolorum ex.
        </Text>
        <Text>{description}</Text>

        <Flex alignItems="center" mt={4} mb={2}>
          <Text fontWeight="bold" marginRight={2} fontSize="lg">
            Date:
          </Text>
          <Text fontSize="lg">23/5/2023</Text>
        </Flex>

        <Flex alignItems="center">
          <Text fontWeight="bold" marginRight={2} fontSize="lg">
            Time:
          </Text>
          <Text fontSize="lg">{time}</Text>
        </Flex>
      </Box>

      <Grid templateColumns="1fr 1fr" gap={4} borderWidth={1} borderRadius="md" boxShadow="md" p={4} mb={4}>
        <Box>
          <Flex alignItems="center" mb={2}>
            <Text fontWeight="bold" marginRight={2} fontSize="lg">
              Capacity:
            </Text>
            <Text fontSize="lg">{capacity}</Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontWeight="bold" mb={2} marginRight={2} fontSize="lg">
              Venue: 
            </Text>
            <Text fontSize="lg">Monash University Malaysia</Text>
          </Flex>

          <Flex alignItems="center" mb={2}>
            <Text fontWeight="bold" marginRight={2} fontSize="lg">
              Recurring:
            </Text>
            <Text fontSize="lg">{recurring ? 'Yes' : 'No'}</Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontWeight="bold" marginRight={2} fontSize="lg">
              Links and QR Code:
            </Text>
            <Image src={fakeQRCode} alt="QR Code" boxSize={250} />
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
              <Badge colorScheme="blue">
                {eventStatistics.gender.male}
              </Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="md">
                Number of Females:
              </Text>
              <Badge colorScheme="pink">
                {eventStatistics.gender.female}
              </Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="md">
                Number of Engineering Specialization:
              </Text>
              <Badge colorScheme="green">
                {eventStatistics.specialization.engineering}
              </Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="md">
                Number of Medicine Specialization:
              </Text>
              <Badge colorScheme="red">
                {eventStatistics.specialization.medicine}
              </Badge>
            </HStack>

            <HStack>
              <Text fontWeight="bold" fontSize="md">
                Number of Arts Specialization:
              </Text>
              <Badge colorScheme="purple">
                {eventStatistics.specialization.arts}
              </Badge>
            </HStack>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default EventDetailsDashboard;



