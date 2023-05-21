import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';

const FinalPage: React.FC = () => {
  const [requireExternalEquipment, setRequireExternalEquipment] = useState<boolean>(false);

  const handleRequireExternalEquipmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRequireExternalEquipment(e.target.checked);
  };

  return (
    <Box mt={4} p={4}>
      <Box width="50%">
        <Heading as="h2" size="lg" mb={4}>
          External Equipment
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Is there external equipment required?
            </FormLabel>
            <Checkbox
              isChecked={requireExternalEquipment}
              onChange={handleRequireExternalEquipmentChange}
            >
              Yes
            </Checkbox>
          </FormControl>
        </VStack>
      </Box>

      <Button mt={8} colorScheme="blue" alignSelf="flex-end">
        Submit
      </Button>
    </Box>
  );
};

export default FinalPage;
