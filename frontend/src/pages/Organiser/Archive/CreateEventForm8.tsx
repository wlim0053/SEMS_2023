import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Icon, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from "@chakra-ui/icons";

import { useState, ChangeEvent } from 'react';

const NextPage: React.FC = () => {
  const [requireExternalEquipment, setRequireExternalEquipment] = useState<boolean>(false);
  const [participantTypes, setParticipantTypes] = useState<string[]>([]);

  const handleBackButtonClick = () => {
    window.location.href = "/CreateEventForm7";
  };

  const handleButtonClick = () => {
    if (participantTypes.includes("Discipline specific")) {
      window.location.href = '/CreateEventForm9';
    }
    else{
      window.location.href = '/OrganiserMainPage'
    }

  };

  const handleRequireExternalEquipmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRequireExternalEquipment(e.target.checked);
  };

  const handleParticipantTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setParticipantTypes(prevTypes => [...prevTypes, type]);
    } else {
      setParticipantTypes(prevTypes => prevTypes.filter(t => t !== type));
    }
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

      <Box width="50%" mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Participants
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>1. Pick at least one type of participants that can participate.</FormLabel>
            <VStack spacing={4} align="start">
              <Checkbox
                isChecked={participantTypes.includes("Members")}
                onChange={(e) => handleParticipantTypeChange("Members", e.target.checked)}
              >
                Members
              </Checkbox>
              <Checkbox
                isChecked={participantTypes.includes("Discipline specific")}
                onChange={(e) => handleParticipantTypeChange("Discipline specific", e.target.checked)}
              >
                Discipline specific
              </Checkbox>
              <Checkbox
                isChecked={participantTypes.includes("Engineering students")}
                onChange={(e) => handleParticipantTypeChange("Engineering students", e.target.checked)}
              >
                Engineering students
              </Checkbox>
              <Checkbox
                isChecked={participantTypes.includes("IT students")}
                onChange={(e) => handleParticipantTypeChange("IT students", e.target.checked)}
              >
                IT students
              </Checkbox>
            </VStack>
          </FormControl>
        </VStack>
      </Box>

      <Button onClick={handleButtonClick} mt={8} colorScheme="blue" alignSelf="flex-end">
        Next
      </Button>
    </Box>
  );
};

export default NextPage;
