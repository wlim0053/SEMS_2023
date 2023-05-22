import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Text, Icon } from '@chakra-ui/react';
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useState } from 'react';

const LastPage: React.FC = () => {
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);

  const handleDisciplineChange = (discipline: string, checked: boolean) => {
    if (checked) {
      setSelectedDisciplines((prevDisciplines) => [...prevDisciplines, discipline]);
    } else {
      setSelectedDisciplines((prevDisciplines) => prevDisciplines.filter((d) => d !== discipline));
    }
  };

  const handleBackButtonClick = () => {
    window.location.href = "/CreateEventForm8";
  };

  const handleNextClick = () => {
    console.log(selectedDisciplines);
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
          Discipline
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Pick all the specific discipline(s) you would like to have in your event/activity.
            </FormLabel>
            <VStack spacing={4} align="start">
            <Checkbox
                isChecked={selectedDisciplines.includes("Psychology")}
                onChange={(e) => handleDisciplineChange("Psychology", e.target.checked)}
              >
                Psychology
              </Checkbox>
              <Checkbox
                isChecked={selectedDisciplines.includes("Business")}
                onChange={(e) => handleDisciplineChange("Business", e.target.checked)}
              >
                Business
              </Checkbox>
              <Checkbox
                isChecked={selectedDisciplines.includes("Communication")}
                onChange={(e) => handleDisciplineChange("Communication", e.target.checked)}
              >
                Communication
              </Checkbox>
              <Checkbox
                isChecked={selectedDisciplines.includes("Biomedical")}
                onChange={(e) => handleDisciplineChange("Biomedical", e.target.checked)}
              >
                Biomedical
              </Checkbox>
              <Checkbox
                isChecked={selectedDisciplines.includes("Computer Science")}
                onChange={(e) => handleDisciplineChange("Computer Science", e.target.checked)}
              >
                Computer Science
              </Checkbox>
              <Checkbox
                isChecked={selectedDisciplines.includes("Electrical Engineering")}
                onChange={(e) => handleDisciplineChange("Electrical Engineering", e.target.checked)}
              >
                Electrical Engineering
              </Checkbox>
              <Checkbox
                isChecked={selectedDisciplines.includes("Mechanical Engineering")}
                onChange={(e) => handleDisciplineChange("Mechanical Engineering", e.target.checked)}
              >
                Mechanical Engineering
              </Checkbox>
              <Checkbox
                isChecked={selectedDisciplines.includes("Civil Engineering")}
                onChange={(e) => handleDisciplineChange("Civil Engineering", e.target.checked)}
              >
                Civil Engineering
              </Checkbox>
            </VStack>
          </FormControl>
        </VStack>
      </Box>

      <Button mt={8} colorScheme="blue" alignSelf="flex-end" onClick={handleNextClick}>
        Next
      </Button>
    </Box>
  );
};

export default LastPage;
