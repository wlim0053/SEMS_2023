import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Text, chakra, Grid } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';

const CustomLink = chakra('a', {
  baseStyle: {
    color: 'blue.500',
    _hover: {
      textDecoration: 'underline',
    },
  },
});

const handleButtonClick = () => {
  // Redirect to another page
  window.location.href = '/CreateEventForm7';
};

const handleButtonClick2 = () => {
  // Redirect to another page
  window.location.href = '/CreateEventForm8';
};
const NextPage: React.FC = () => {
  const [hasVIP, setHasVIP] = useState<boolean>(false);
  const [externalVendor, setExternalVendor] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sarahRiskAssessment, setSarahRiskAssessment] = useState<File | null>(null);

  const handleHasVIPChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasVIP(e.target.checked);
  };

  const handleExternalVendorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExternalVendor(e.target.checked);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSarahRiskAssessmentUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSarahRiskAssessment(file);
  };

  return (
    <Box mt={4} p={4}>
      <Box width="50%" mb={20}>
        <Heading as="h2" size="lg" mb={4}>
          External Guest Details
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Will there be VIP?
            </FormLabel>
            <Checkbox
              isChecked={hasVIP}
              onChange={handleHasVIPChange}
            >
              Yes
            </Checkbox>
          </FormControl>
          <FormControl>
            <FormLabel>
              2. External Speaker Profile
            </FormLabel>
            <VStack align="start" spacing={2}>
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
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Download the template{' '}
                  <CustomLink
                    href="https://docs.google.com/document/d/1NFGiEpsiTPsPugY2f2S_1qmpLKGZQxpG/edit?usp=sharing&ouid=109039236319263624802&rtpof=true&sd=true"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </CustomLink>
                  .
                </Text>

              </Box>

            </VStack>
          </FormControl>
        </VStack>
      </Box>

      <Box width="50%" mt={20}>
        <Heading as="h2" size="lg" mb={4}>
          External Vendor
        </Heading>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>
              1. Will there be external vendors/caterers?
            </FormLabel>
            {/* <Checkbox
              isChecked={externalVendor}
              onChange={handleExternalVendorChange}
            >
              Yes
            </Checkbox> */}
            <Grid templateColumns="repeat(2, minmax(0, 2fr))" gap={4}>

              <Button mt={8} colorScheme="blue" onClick={handleButtonClick}>
                yes
              </Button>

              <Button mt={8} colorScheme="blue" onClick={handleButtonClick2}>
                no
              </Button>
            </Grid>
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};

export default NextPage;
