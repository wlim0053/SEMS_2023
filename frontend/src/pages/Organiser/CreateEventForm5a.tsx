import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Text, Input } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';

const NextPage: React.FC = () => {
  const [offCampusAddress, setOffCampusAddress] = useState<string>("");
  const [travelMode, setTravelMode] = useState<string>("");
  const [hasExternalGuests, setHasExternalGuests] = useState<boolean>(false);

  const handleOffCampusAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOffCampusAddress(e.target.value);
  };

  const handleTravelModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTravelMode(e.target.value);
  };
  const handleButtonClick = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm6';
  };
  const handleButtonClick2 = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm8';
  };

  return (
    <Box mt={4} p={4}>
      <Box mb={20}>
        <Heading as="h2" size="lg" mb={4}>
          Off Campus Venue
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Enter the address of the location
            </FormLabel>
            <Input
              value={offCampusAddress}
              onChange={handleOffCampusAddressChange}
              placeholder="Enter address"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              2. Enter the mode of travel
            </FormLabel>
            <Input
              value={travelMode}
              onChange={handleTravelModeChange}
              placeholder="Enter travel mode"
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
              {/* <Checkbox
                isChecked={hasExternalGuests}
                onChange={(e) => setHasExternalGuests(e.target.checked)}
              >
                Yes
              </Checkbox> */}
              <Button mt={8} colorScheme="blue" onClick={handleButtonClick} >
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
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};

export default NextPage;
