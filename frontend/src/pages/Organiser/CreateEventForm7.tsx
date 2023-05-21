import { Box, Heading, VStack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';

const NextPage: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");

  const handleCompanyNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleContactNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContactNumber(e.target.value);
  };

  return (
    <Box mt={4} p={4}>
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

      <Button mt={8} colorScheme="blue" alignSelf="flex-end">
        Next
      </Button>
    </Box>
  );
};

export default NextPage;
