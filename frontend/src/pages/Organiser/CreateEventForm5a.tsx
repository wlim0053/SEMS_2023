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
            <VStack spacing={2} align="start" ml={4}>
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
          </FormControl>
        </VStack>
      </Box>

      <Button mt={8} colorScheme="blue" alignSelf="flex-end">
        Next
      </Button>
    </Box>
  );
};

export default NextPage;
