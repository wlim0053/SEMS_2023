import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Icon, Input, Tooltip, Text } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { InfoIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const NextPage: React.FC = () => {
  const [bookingReferenceNumber, setBookingReferenceNumber] = useState<string>("");
  const [venueName, setVenueName] = useState<string>("");
  const [hasExternalGuests, setHasExternalGuests] = useState<boolean>(false);

  const handleBookingReferenceNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBookingReferenceNumber(e.target.value);
  };

  const handleVenueNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVenueName(e.target.value);
  };

  const handleBackButtonClick = () => {
    window.location.href = "/CreateEventForm4a";
  };

  const handleButtonClick = () => {
    window.location.href = '/CreateEventForm6';
  };

  return (
    <Box p={4}>
      <Button
        variant="unstyled"
        _hover={{ textDecoration: 'none' }}
        alignItems="center"
        
        onClick={handleBackButtonClick}
      >
        <Icon as={ChevronLeftIcon} display="inline-block" mb={1} color="gray.400" />
        <Text display="inline-block" color="gray.400">
          Back
        </Text>
      </Button>
      <Box mb={20}>
        <Heading as="h2" size="lg" mb={4} display={'inline-block'}>
          On Campus Venue
        </Heading>
        <Tooltip label="A separate venue approval will be sent to you by the respective venue owners" aria-label="information-tooltip" placement="right-end" closeDelay={1000}>
          <InfoIcon boxSize={4} ml={4} color="gray.500" cursor="help" />
        </Tooltip>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Enter the booking reference number
            </FormLabel>
            <Input
              value={bookingReferenceNumber}
              onChange={handleBookingReferenceNumberChange}
              placeholder="Enter booking reference number"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              2. Enter the name of the venue
            </FormLabel>
            <Input
              value={venueName}
              onChange={handleVenueNameChange}
              placeholder="Enter venue name"
            />
          </FormControl>
        </VStack>
      </Box>

      <Box mt={9}>
        <Heading as="h2" size="lg" mb={4}>
          External Guests
        </Heading>
        <VStack spacing={4} align="start">
          <FormLabel>1. Will there be external guests?</FormLabel>
          <Checkbox
            isChecked={hasExternalGuests}
            onChange={(e) => setHasExternalGuests(e.target.checked)}
          >
            Yes
          </Checkbox>
          <Checkbox
            isChecked={!hasExternalGuests}
            onChange={(e) => setHasExternalGuests(!e.target.checked)}
          >
            No
          </Checkbox>
        </VStack>
      </Box>

      <Button  onClick={handleButtonClick} mt={8} colorScheme="blue" alignSelf="flex-end">
        Next
      </Button>
    </Box>
  );
};

export default NextPage;
