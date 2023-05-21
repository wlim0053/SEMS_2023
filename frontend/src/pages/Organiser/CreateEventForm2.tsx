import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

const Page2 = () => {
  const [club, setClub] = useState("");
  const [clubName, setClubName] = useState("");
  const [email, setEmail] = useState("");
  const [personInCharge, setPersonInCharge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const handleButtonClick = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm3';
  };
  const handleSubmit = () => {
    // Handle form submission
    // You can access the form data using the state variables
    console.log("Form submitted:", {
      club,
      clubName,
      email,
      personInCharge,
      contactNumber,
    });
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Collaborators Details
      </Heading>

      <FormControl mb={4}>
        <FormLabel>
          1. Name of Club/Team
          <Tooltip label="If you are collaborating with an institution outside of Monash University Malaysia, please indicate so by selecting 'Other' and stating the name of the institution." placement="right-end">
            <InfoIcon ml={2} color="gray.500" boxSize={4} />
          </Tooltip>
        </FormLabel>
        <Input
          value={club}
          onChange={(e) => setClub(e.target.value)}
          placeholder="Enter club/team name"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>
          2. Club's email address
          <Tooltip label="Please provide the email address associated with the club/team." placement="right-end">
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
          <Tooltip label="Please provide the name of the person who is in charge of the club/team." placement="right-end">
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
