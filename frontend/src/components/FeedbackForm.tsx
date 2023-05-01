import React from "react";
import {
  Box,
  Button,
  Stack,
  Input,
  Heading,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";

const FeedbackForm = () => {
  const [value, setValue] = React.useState("0");
  return (
    <div>
      <Box
        color="gray.600"
        fontSize="sm"
        width="50%"
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
        <Stack spacing={6}>
          <Input placeholder="Name" size="md" />
          <Input placeholder="Student ID" size="md" />
          <Stack spacing={5}>
            <Text fontSize="md">
              Overall, how satisfied are you with the event?
            </Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row" spacing={7}>
                <Radio value="1">Very Unsatisfied</Radio>
                <Radio value="2">Unsatisfied</Radio>
                <Radio value="3">Neutral</Radio>
                <Radio value="4">Satisfied</Radio>
                <Radio value="5">Very Satisfied</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
          <Stack>
            <Text fontSize="md" marginTop={3}>
              Describe what worked well in the event
            </Text>
            <Textarea size="md" minHeight={100} />
          </Stack>
          <Stack>
            <Text fontSize="md" marginTop={3}>
              Describe what did not work well in the event
            </Text>
            <Textarea size="md" minHeight={100} />
          </Stack>
        </Stack>
        <Button colorScheme="teal" size="md" marginTop={8} bgColor={"#006DAE"}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default FeedbackForm;
