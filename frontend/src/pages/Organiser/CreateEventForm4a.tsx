import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button } from '@chakra-ui/react';
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

  return (
    <Box mt={8}>
      <Heading as="h2" size="lg" mb={4}>
        Venue Description
      </Heading>
      <VStack spacing={4} align="start">
        <FormControl>
          <FormLabel>Proposed Venue</FormLabel>
          <Checkbox
            value="On Campus"
            isChecked={proposedVenue.includes('On Campus')}
            onChange={(e) =>
              setProposedVenue((prev) =>
                e.target.checked ? [...prev, 'On Campus'] : prev.filter((value) => value !== 'On Campus')
              )
            }
          >
            On Campus
          </Checkbox>
          <Checkbox
            value="Off Campus"
            isChecked={proposedVenue.includes('Off Campus')}
            onChange={(e) =>
              setProposedVenue((prev) =>
                e.target.checked ? [...prev, 'Off Campus'] : prev.filter((value) => value !== 'Off Campus')
              )
            }
          >
            Off Campus
          </Checkbox>
        </FormControl>
      </VStack>

      <Box mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Event Details
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>Please upload your draft program here.</FormLabel>
            <input type="file" accept=".pdf" onChange={handleDraftProgramUpload} />
          </FormControl>
          <FormControl>
            <FormLabel>Have you submitted the Risk Assessment Form?</FormLabel>
            <Checkbox
              isChecked={hasSubmittedRiskAssessment}
              onChange={(e) => setHasSubmittedRiskAssessment(e.target.checked)}
            >
              Yes
            </Checkbox>
          </FormControl>
          <FormControl>
            <FormLabel>Please attach the SARAH Risk Assessment for this Event.</FormLabel>
            <input type="file" accept=".pdf" onChange={handleSarahRiskAssessmentUpload} />
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};

export default OrganizerPage;
