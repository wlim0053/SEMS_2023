import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Text, Center, Grid } from '@chakra-ui/react';
import { left } from '@popperjs/core';
import { useState, ChangeEvent } from 'react';

const OrganizerPage: React.FC = () => {
  const [draftProgram, setDraftProgram] = useState<File | undefined>(undefined);
  const [hasSubmittedRiskAssessment, setHasSubmittedRiskAssessment] = useState<boolean>(false);
  const [sarahRiskAssessment, setSarahRiskAssessment] = useState<File | undefined>(undefined);
  const [proposedVenue, setProposedVenue] = useState<string[]>([]);

  const handleDraftProgramUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setDraftProgram(file);
  };

  const handleSarahRiskAssessmentUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSarahRiskAssessment(file);
  };

  const handleButtonClick = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm5a';
  };

  const handleButtonClick2 = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm5b';
  };

  return (
    <Box mt={4} p={4}
    >
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
              <label htmlFor="sarah-risk-assessment" className="file-input-label">
                <Button as="span" variant="outline" size="sm" mb={2}>
                  Choose File
                </Button>
                <Text fontSize="sm" ml={2}>
                  {sarahRiskAssessment ? sarahRiskAssessment.name : 'No file chosen'}
                </Text>
              </label>
              <input id="sarah-risk-assessment" type="file" accept=".pdf" onChange={handleSarahRiskAssessmentUpload} style={{ display: 'none' }} />
            </Box>
          </FormControl>
        </VStack>
      </Box>
      <Box width="50%" mb={20}>
        <Heading as="h2" size="lg" mb={4}>
          Venue Description
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Proposed Venue
              </FormLabel>
                {/* <Checkbox
                value="On Campus"
                isChecked={proposedVenue.includes('On Campus')}
                onChange={(e) =>
                  setProposedVenue((prev) =>
                    e.target.checked ? [...prev, 'On Campus'] : prev.filter((value) => value !== 'On Campus')
                  )
                }
              >
                On Campus
              </Checkbox> */}
                <Grid templateColumns="repeat(2, minmax(0, 2fr))" gap={4}>  

                <Button mt={8} colorScheme="blue" onClick={handleButtonClick2}>
                  On Campus
                </Button>
                {/* <Checkbox
                value="Off Campus"
                isChecked={proposedVenue.includes('Off Campus')}
                onChange={(e) =>
                  setProposedVenue((prev) =>
                    e.target.checked ? [...prev, 'Off Campus'] : prev.filter((value) => value !== 'Off Campus')
                  )
                }
              >
                Off Campus
              </Checkbox> */}
                <Button mt={8} colorScheme="blue" onClick={handleButtonClick}>
                  Off Campus
                </Button>
              
            </Grid>
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};

export default OrganizerPage;
