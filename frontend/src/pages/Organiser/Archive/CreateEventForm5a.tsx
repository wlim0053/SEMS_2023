import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Text, Input, Icon } from '@chakra-ui/react';
import { ChevronLeftIcon} from "@chakra-ui/icons";
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

      <Box mt={20}>
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
