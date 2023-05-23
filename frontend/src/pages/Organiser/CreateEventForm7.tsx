import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Text, Icon } from '@chakra-ui/react';
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useState, ChangeEvent } from 'react';

const NextPage: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");

  const handleBackButtonClick = () => {
    window.location.href = "/CreateEventForm6";
  };

  const handleButtonClick = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm8';
  };


  const handleCompanyNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleContactNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContactNumber(e.target.value);
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
      <Box width="50%" mb={20}>
        <Heading as="h2" size="lg" mb={4}>
          External Vendor/Caterer Details
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Company Name
            </FormLabel>
            <Input
              value={companyName}
              onChange={handleCompanyNameChange}
              placeholder="Enter company name"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              2. Contact Number
            </FormLabel>
            <Input
              value={contactNumber}
              onChange={handleContactNumberChange}
              placeholder="Enter contact number"
            />
          </FormControl>
        </VStack>
      </Box>

      <Button mt={8} colorScheme="blue" alignSelf="flex-end" onClick={handleButtonClick}>
        Next
      </Button>
    </Box>
  );
};

export default NextPage;
