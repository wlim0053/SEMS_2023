import { useEffect } from "react";
import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Stack,
  Image,
  Input,
  Heading,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import api from "../utils/api";

const FeedbackForm = () => {
  const [communication, setCommunication] = React.useState("0");
  const [PM, setPM] = React.useState("0");
  const [PS, setPS] = React.useState("0");
  const [teamwork, setTeamwork] = React.useState("0");
  const [reflection, setReflection] = React.useState("");
  const [buttonClicked, setButtonClicked] = React.useState(false);

  const changeReflection = (event) => setReflection(event.target.value);
  const communicationEmpty = communication == "0";
  const PMEmpty = PM == "0";
  const PSEmpty = PS == "0";
  const teamworkEmpty = teamwork == "0";
  const reflectionEmpty = reflection == "";

  const body = {
    participation_uuid: "8AEB18BB-4A51-4366-8ACC-C86A9CFA3F0F",
    feedback_comm: Number(communication),
    feedback_proj: Number(PM),
    feedback_solve: Number(PS),
    feedback_teamwork: Number(teamwork),
    feedback_reflection: reflection,
  };

  const handleSubmit = async (e) => {
    if (
      !communicationEmpty &&
      !PMEmpty &&
      !PSEmpty &&
      !teamworkEmpty &&
      !reflectionEmpty
    ) {
      e.preventDefault();
      console.log(body);
      try {
        setCommunication("0");
        setPM("0");
        setPS("0");
        setTeamwork("0");
        setReflection("");
        setButtonClicked(false);

        const response = await api.post("/feedback", body);
        let data = response.data;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setButtonClicked(true);
    }
  };

  return (
    <>
      <Box
        color="gray.600"
        fontSize="sm"
        width="60em"
        margin={"auto"}
        padding={6}
        borderWidth={3}
        borderColor={"#000000"}
        marginTop={6}
        marginBottom={6}
      >
        <Heading marginBottom={9} marginTop={6}>
          Feedback
        </Heading>

        <Stack spacing={8} fontFamily={"Arial"}>
          <Text fontSize="md" marginBottom={"-3"}>
            Guide to Employability Skills
          </Text>
          <Image
            width="45em"
            paddingBottom="3"
            alignSelf={"center"}
            src="../../public/GuideToEmployabilitySkills.png"
          ></Image>
          <Text fontSize="md">
            This event has helped me to improve the following skills:
          </Text>
          <TableContainer>
            <Table variant="simple" fontFamily={"Arial"}>
              <Thead>
                <Tr textAlign={"center"}>
                  <Td></Td>
                  <Td width={"30%"}>Disagree</Td>
                  <Td width={"30%"}>Neutral</Td>
                  <Td>Agree</Td>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td paddingRight={20}>Communication</Td>
                  <Td colSpan={3}>
                    <FormControl
                      isInvalid={buttonClicked && communicationEmpty}
                    >
                      <RadioGroup
                        onChange={setCommunication}
                        value={communication}
                        marginLeft={4}
                      >
                        <Stack direction="row" spacing={180}>
                          <Radio value="1"></Radio>
                          <Radio value="2"></Radio>
                          <Radio value="3"></Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>Input is required.</FormErrorMessage>
                    </FormControl>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Project Management</Td>
                  <Td colSpan={3}>
                    <FormControl isInvalid={buttonClicked && PMEmpty}>
                      <RadioGroup onChange={setPM} value={PM} marginLeft={4}>
                        <Stack direction="row" spacing={180}>
                          <Radio value="1"></Radio>
                          <Radio value="2"></Radio>
                          <Radio value="3"></Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>Input is required.</FormErrorMessage>
                    </FormControl>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Problem Solving</Td>
                  <Td colSpan={3}>
                    <FormControl isInvalid={buttonClicked && PSEmpty}>
                      <RadioGroup onChange={setPS} value={PS} marginLeft={4}>
                        <Stack direction="row" spacing={180}>
                          <Radio value="1"></Radio>
                          <Radio value="2"></Radio>
                          <Radio value="3"></Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>Input is required.</FormErrorMessage>
                    </FormControl>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Teamwork</Td>
                  <Td colSpan={3}>
                    <FormControl isInvalid={buttonClicked && teamworkEmpty}>
                      <RadioGroup
                        onChange={setTeamwork}
                        value={teamwork}
                        marginLeft={4}
                      >
                        <Stack direction="row" spacing={180}>
                          <Radio value="1"></Radio>
                          <Radio value="2"></Radio>
                          <Radio value="3"></Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>Input is required.</FormErrorMessage>
                    </FormControl>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <FormControl isInvalid={buttonClicked && reflectionEmpty}>
            <FormLabel fontSize="md" paddingTop={10} paddingBottom={5}>
              REFLECTION - Please reflect on your experiences during this
              activity and identify how each component of the activity has
              helped you to develop your employability skills.
            </FormLabel>
            <Textarea
              size="md"
              minHeight={100}
              placeholder="Your answer"
              value={reflection}
              onChange={changeReflection}
            />
            <FormErrorMessage>Input is required.</FormErrorMessage>
          </FormControl>
        </Stack>
        <Button
          colorScheme="teal"
          size="md"
          marginTop={10}
          bgColor={"#006DAE"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default FeedbackForm;
