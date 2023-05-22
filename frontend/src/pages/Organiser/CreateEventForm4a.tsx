import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Text, Stack, chakra, Icon } from '@chakra-ui/react';
import { ChevronLeftIcon} from "@chakra-ui/icons";
import { useState, ChangeEvent } from 'react';

const OrganizerPage: React.FC = () => {
  const [draftProgram, setDraftProgram] = useState<File | undefined>(undefined);
  const [hasSubmittedRiskAssessment, setHasSubmittedRiskAssessment] = useState<boolean>(false);
  const [sarahRiskAssessment, setSarahRiskAssessment] = useState<File | undefined>(undefined);
  const [proposedVenue, setProposedVenue] = useState("Off Campus");

  const handleDraftProgramUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setDraftProgram(file);
  };

  const CustomLink = chakra('a', {
    baseStyle: {
      color: 'blue.500',
      _hover: {
        textDecoration: 'underline',
      },
    },
  });

  const handleSarahRiskAssessmentUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSarahRiskAssessment(file);
  };

  const handleBackButtonClick = () => {
    window.location.href = "/CreateEventForm3";
  };

  const handleButtonClick = () => {
    if (proposedVenue == "On Campus"){
      window.location.href = '/CreateEventForm5b';
    }
    if (proposedVenue == "Off Campus"){
      window.location.href = '/CreateEventForm5a';
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
          Event Details
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Please upload your draft program here.
            </FormLabel>
            <Box>
              <label htmlFor="draft-program" className="file-input-label">
                <Button as="span" variant="outline" size="sm" mb={2}>
                  Choose File
                </Button>
                <Text fontSize="sm" ml={2}>
                  {draftProgram ? draftProgram.name : 'No file chosen'}
                </Text>
              </label>
              <input id="draft-program" type="file" accept=".pdf" onChange={handleDraftProgramUpload} style={{ display: 'none' }} />
            </Box>
          </FormControl>
          <FormControl>
            <FormLabel>
              2. Have you submitted the Risk Assessment Form?
            </FormLabel>
            <Checkbox
              isChecked={hasSubmittedRiskAssessment}
              onChange={(e) => setHasSubmittedRiskAssessment(e.target.checked)}
            >
              Yes
            </Checkbox>
          </FormControl>

          <FormControl>
            <FormLabel>
              3. Please attach the SARAH Risk Assessment for this Event.
            </FormLabel>
            <Box>
            <Stack direction="row" align="center" display={"block"}>

              <FormControl mb={1}>
                <Button as="span" variant="outline" size="sm" mb={2}>
                  Choose File
                </Button>
                <input
                  id="sarah-risk-assessment"
                  type="file"
                  onChange={handleSarahRiskAssessmentUpload}
                  style={{ display: "none" }}
                />
              </FormControl>
              <Text fontSize="sm" ml={2}>
                {sarahRiskAssessment ? sarahRiskAssessment.name : 'No file chosen'}
              </Text>
              <Text fontSize="sm" color="gray.500" mt={1} ml={2}>
                Download the template{' '}
                <CustomLink
                  href="https://www.monash.edu/ohs/sarah?_ga=2.117501441.988076343.1649137668-1418036857.1645022689"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </CustomLink>
                      .
              </Text>
            </Stack>
            </Box>
          </FormControl>
        </VStack>
      </Box>
      <Box width="50%" mt={10}>
        <Heading as="h2" size="lg" mb={4}>
          Venue Description
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Proposed Venue
              </FormLabel>
              <Stack spacing={2}>
                  <Checkbox
                  value="On Campus"
                  isChecked={proposedVenue === "On Campus"}
                  onChange={(e) => {
                    setProposedVenue(e.target.checked ? "On Campus" : "");
                  }}
                >
                  On Campus
                </Checkbox> 

                <Checkbox
                  value="Off Campus"
                  isChecked={proposedVenue === "Off Campus"}
                  onChange={(e) => {
                    setProposedVenue(e.target.checked ? "Off Campus" : "");
                  }}
                >
                  Off Campus
                </Checkbox>
              </Stack>
          </FormControl>
        </VStack>
      </Box>

      <Button  onClick={handleButtonClick} mt={8} colorScheme="blue" alignSelf="flex-end">
        Next
      </Button>
    </Box>
  );
};

export default OrganizerPage;
