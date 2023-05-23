import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from '@chakra-ui/react';
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";

interface EventCardProps {
  eventName: string;
  venue: string;
  club: string;
  participants: string;
  date: string;
}

const EventCards: React.FC<EventCardProps> = ({ eventName, venue, club, participants, date }) => {
  return (
    <Card width="250px" m={4}>
      <CardHeader>
        <Box bg="blue.300" display="inline-block" p={1} borderRadius="5px" padding={1}>
          <Heading size="md" color="white">
            {eventName}
          </Heading>
        </Box>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Venue
            </Heading>
            <Text pt="2" fontSize="sm">
              {venue}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Club
            </Heading>
            <Text pt="2" fontSize="sm">
              {club}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Participants
            </Heading>
            <Text pt="2" fontSize="sm">
              {participants}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Date
            </Heading>
            <Text pt="2" fontSize="sm">
              {date}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <Box w="100%" p={2} bg="#EDEEEE" display="flex" justifyContent={["center", "space-between"]} alignItems="center" pl={4} pr={4}>
        <IconButton
          colorScheme="blue"
          aria-label="View Event"
          icon={<ViewIcon />}
          size="sm"
        />

        <IconButton
          colorScheme="blue"
          aria-label="Reorganise Event"
          icon={<RepeatIcon />}
          size="sm"
        />

        <IconButton
          colorScheme="blue"
          aria-label="Delete Event"
          icon={<DeleteIcon />}
          size="sm"
        />
      </Box>
    </Card>
  );
};

export default EventCards;
