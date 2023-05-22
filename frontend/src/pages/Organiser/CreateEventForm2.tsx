import React, { useState } from "react";
import { Text, Box, Button, Checkbox, FormControl, FormLabel, Input, Heading, Tooltip, VStack, Icon } from "@chakra-ui/react";
import { InfoIcon, ChevronLeftIcon} from "@chakra-ui/icons";

const Page2 = () => {
  const [clubs, setClubs] = useState<string[]>([]);
  const [otherClub, setOtherClub] = useState("");
  const [email, setEmail] = useState("");
  const [personInCharge, setPersonInCharge] = useState("");
  const [contactNumber, setContactNumber] = useState("");


  
  const handleClubChange = (club: string) => {
    if (clubs.includes(club)) {
      setClubs((prevClubs) => prevClubs.filter((c) => c !== club));
    } else {
      setClubs((prevClubs) => [...prevClubs, club]);
    }
  };

  const handleOtherClubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherClub(e.target.value);
  };

  const handleBackButtonClick = () => {
    window.location.href = "/CreateEventForm";
  };

  const handleButtonClick = () => {
    window.location.href = "/CreateEventForm3";
  };

  const handleSubmit = () => {
    // Handle form submission
    // You can access the form data using the state variables
    console.log("Form submitted:", {
      clubs,
      otherClub,
      email,
      personInCharge,
      contactNumber,
    });
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

      <Heading as="h2" mb={4}>
        Collaborators Details
      </Heading>

      <FormControl mb={4}>
        <FormLabel>
          1. Name of Club/Team
          <Tooltip
            label="If you are collaborating with an institution outside of Monash University Malaysia, please indicate so by selecting 'Other' and stating the name of the institution."
            placement="right-end"
          >
            <InfoIcon ml={2} color="gray.500" boxSize={4} />
          </Tooltip>
        </FormLabel>
        <VStack align="start" spacing={2}>
          <Checkbox
            isChecked={clubs.includes("MUMTEC")}
            onChange={() => handleClubChange("MUMTEC")}
          >
            MUMTEC
          </Checkbox>
          <Checkbox
            isChecked={clubs.includes("MUSA SoIT")}
            onChange={() => handleClubChange("MUSA SoIT")}
          >
            MUSA SoIT
          </Checkbox>
          <Checkbox
            isChecked={clubs.includes("GDSC")}
            onChange={() => handleClubChange("GDSC")}
          >
            GDSC
          </Checkbox>
          <Checkbox
            isChecked={clubs.includes("WIRED")}
            onChange={() => handleClubChange("WIRED")}
          >
            WIRED
          </Checkbox>
          <Checkbox
            isChecked={clubs.includes("Other")}
            onChange={() => handleClubChange("Other")}
          >
            Other
          </Checkbox>
          {clubs.includes("Other") && (
            <Input
              value={otherClub}
              onChange={handleOtherClubChange}
              placeholder="Enter other club/team name"
            />
          )}
        </VStack>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>
          2. Club's email address
          <Tooltip
            label="Please provide the email address associated with the club/team."
            placement="right-end"
          >
            <InfoIcon ml={2} color="gray.500" boxSize={4} />
          </Tooltip>
        </FormLabel>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email address"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>
          3. Name of Person in charge
          <Tooltip
            label="Please provide the name of the person who is in charge of the club/team."
            placement="right-end"
          >
            <InfoIcon ml={2} color="gray.500" boxSize={4} />
          </Tooltip>
        </FormLabel>
        <Input
          value={personInCharge}
          onChange={(e) => setPersonInCharge(e.target.value)}
          placeholder="Enter name"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>
          4. Contact number
          <Tooltip label="Please include the country code." placement="right-end">
            <InfoIcon ml={2} color="gray.500" boxSize={4} />
          </Tooltip>
        </FormLabel>
        <Input
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Enter contact number"
        />
      </FormControl>

      <Button onClick={handleButtonClick} colorScheme="blue" mt={4}>
        Next Page
      </Button>
    </Box>
  );
};

export default Page2;
