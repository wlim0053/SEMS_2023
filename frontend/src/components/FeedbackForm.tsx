import React from "react";
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
} from "@chakra-ui/react";

const FeedbackForm = () => {
  const [communication, setCommunication] = React.useState("0");
  const [PM, setPM] = React.useState("0");
  const [PS, setPS] = React.useState("0");
  const [teamwork, setTeamwork] = React.useState("0");
  const [reflection, setReflection] = React.useState("");
  const changeReflection = (event) => setReflection(event.target.value);

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
                  </Td>
                </Tr>
                <Tr>
                  <Td>Project Management</Td>
                  <Td colSpan={3}>
                    <RadioGroup onChange={setPM} value={PM} marginLeft={4}>
                      <Stack direction="row" spacing={180}>
                        <Radio value="1"></Radio>
                        <Radio value="2"></Radio>
                        <Radio value="3"></Radio>
                      </Stack>
                    </RadioGroup>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Problem Solving</Td>
                  <Td colSpan={3}>
                    <RadioGroup onChange={setPS} value={PS} marginLeft={4}>
                      <Stack direction="row" spacing={180}>
                        <Radio value="1"></Radio>
                        <Radio value="2"></Radio>
                        <Radio value="3"></Radio>
                      </Stack>
                    </RadioGroup>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Teamwork</Td>
                  <Td colSpan={3}>
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
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <Text fontSize="md" paddingTop={10}>
            REFLECTION - Please reflect on your experiences during this activity
            and identify how each component of the activity has helped you to
            develop your employability skills.
          </Text>
          <Textarea
            size="md"
            minHeight={100}
            placeholder="Your answer"
            value={reflection}
            onChange={changeReflection}
          />
        </Stack>
        <Button colorScheme="teal" size="md" marginTop={10} bgColor={"#006DAE"}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default FeedbackForm;
