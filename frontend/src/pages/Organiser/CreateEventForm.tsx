import React, { useState } from "react";
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Stack, Heading, Grid } from "@chakra-ui/react";

const clubs = [
  { value: "S", label: "SoIT" },
  { value: "M", label: "MUMTEC" },
  { value: "G", label: "GDSC" },
  { value: "W", label: "Wired" },
];

const Page1 = () => {
  const [eventID, setEventID] = useState("");
  const [club, setClub] = useState("");
  const [clubName, setClubName] = useState("");
  const [email, setEmail] = useState("");
  const [personInCharge, setPersonInCharge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [collaboration, setCollaboration] = useState(false);
  const handleButtonClick = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm2';
  };
  const handleButtonClick2 = () => {
    // Redirect to another page
    window.location.href = '/CreateEventForm3';
  };
  const handleSubmit = () => {
    // Handle form submission
    // You can access the form data using the state variables
    console.log("Form submitted:", {
      eventID,
      club,
      clubName,
      email,
      personInCharge,
      contactNumber,
      collaboration,
    });
  };


  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        Organizer Details
      </Heading>

      <FormControl mb={4}>
        <FormLabel>1. Event-ID</FormLabel>
        <Input
          value={eventID}
          onChange={(e) => setEventID(e.target.value)}
          placeholder="Format: S - SoIT, M - MUMTEC, G - GDSC, W - Wired (e.g. S-003-2022)"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>2. Name of Club/Team</FormLabel>
        <Stack spacing={2} ml={4}>
          {clubs.map((clubOption) => (
            <Checkbox
              key={clubOption.value}
              isChecked={club === clubOption.value}
              onChange={() => setClub(clubOption.value)}
            >
              {clubOption.label}
            </Checkbox>
          ))}
          <Checkbox isChecked={club === "Other"} onChange={() => setClub("Other")}>
            Other
          </Checkbox>
          {club === "Other" && (
            <Input
              mt={2}
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="Enter club name"
            />
          )}
        </Stack>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>3. Organizing Club's email address</FormLabel>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email address"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>4. Name of Person in charge</FormLabel>
        <Input
          value={personInCharge}
          onChange={(e) => setPersonInCharge(e.target.value)}
          placeholder="Enter name"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>5. Contact number of person in charge</FormLabel>
        <Input
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Enter contact number"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>6. Is this event held in collaboration with another club/team/institution?</FormLabel>
        
        {/* <Checkbox isChecked={collaboration} onChange={() => setCollaboration(!collaboration)}>
          Yes
        </Checkbox> */}
        <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={4}>  
        <Button onClick={handleButtonClick} colorScheme="blue" mt={4}>
          yes
        </Button>
        <Button onClick={handleButtonClick2} colorScheme="blue" mt={4}>
          no
        </Button> 
        </Grid>
      </FormControl>
      


    </Box>
  );
};

export default Page1;

