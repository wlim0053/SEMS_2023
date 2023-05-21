import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Text, Input, Tooltip } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { InfoIcon } from "@chakra-ui/icons";

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

  const handleButtonClick = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm6';
  };

  const handleButtonClick2 = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm7';
  };

  return (
    <Box mt={4} p={4}>
      <Box width="50%" mb={20}>
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

      <Box width="50%">
        <Heading as="h2" size="lg" mb={4}>
          External Guests
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Will there be external guests?
            </FormLabel>
            <VStack spacing={2} align="start" ml={4}>
              {/* <Checkbox
                isChecked={hasExternalGuests}
                onChange={(e) => setHasExternalGuests(e.target.checked)}
              >
                Yes
              </Checkbox> */}
              <Button mt={8} colorScheme="blue" onClick={handleButtonClick}>
                yes
              </Button>
              {/* <Checkbox
                isChecked={!hasExternalGuests}
                onChange={(e) => setHasExternalGuests(!e.target.checked)}
              >
                No
              </Checkbox> */}
              <Button mt={8} colorScheme="blue" onClick={handleButtonClick2}>
                no
              </Button>
            </VStack>
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};

export default NextPage;
