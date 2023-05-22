import { Box, Heading, VStack, FormControl, FormLabel, Checkbox, Button, Text, chakra, Icon } from '@chakra-ui/react';
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useState, ChangeEvent } from 'react';

const CustomLink = chakra('a', {
  baseStyle: {
    color: 'blue.500',
    _hover: {
      textDecoration: 'underline',
    },
  },
});



const NextPage: React.FC = () => {
  const [hasVIP, setHasVIP] = useState<boolean>(false);
  const [externalVendor, setExternalVendor] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sarahRiskAssessment, setSarahRiskAssessment] = useState<File | null>(null);

  const handleBackButtonClick = () => {
    window.location.href = "/CreateEventForm5a";
  };

  const handleButtonClick = () => {
    if (externalVendor){
      window.location.href = '/CreateEventForm7';
    }
    else{
      window.location.href = '/CreateEventForm8';
    }
  };

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
            <Checkbox
              isChecked={externalVendor}
              onChange={handleExternalVendorChange}
            >
              Yes
            </Checkbox> 
          </FormControl>
        </VStack>
      </Box>
      <Button  onClick={handleButtonClick} mt={8} colorScheme="blue" alignSelf="flex-end">
        Next
      </Button>
    </Box>
  );
};

export default NextPage;
