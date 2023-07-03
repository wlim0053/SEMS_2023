import * as Yup from "yup";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Stack,
  Image,
  Heading,
  Text,
  Textarea,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import api from "../utils/api";
import FeedbackRadioTable from "./FeedbackRadioTable";

interface Props {
  eventTitle: string;
  participationID: string;
}

const FeedbackFormSchema = Yup.object().shape({
  communication: Yup.string().required("Required"),
  PM: Yup.string().required("Required"),
  PS: Yup.string().required("Required"),
  teamwork: Yup.string().required("Required"),
  reflection: Yup.string().required("Required"),
});

const FeedbackForm = ({ eventTitle, participationID }: Props) => {
  const toast = useToast();
  return (
    <>
      <Box
        color="#000000"
        fontSize="sm"
        width="53em"
        margin={"auto"}
        padding={6}
        // borderWidth={3}
        // borderColor={"#000000"}
        marginTop={4}
        marginBottom={6}
      >
        <Heading
          marginBottom={9}
          marginTop={6}
          fontSize={"3xl"}
          color={"#000000"}
        >
          Feedback for {eventTitle}
        </Heading>
        <Formik
          initialValues={{
            communication: "",
            PM: "",
            PS: "",
            teamwork: "",
            reflection: "",
          }}
          validationSchema={FeedbackFormSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(async (e) => {
              setSubmitting(false);
              const body = {
                participation_uuid: participationID,
                feedback_comm: Number(values.communication),
                feedback_proj: Number(values.PM),
                feedback_solve: Number(values.PS),
                feedback_teamwork: Number(values.teamwork),
                feedback_reflection: values.reflection,
              };
              try {
                const response = await api.post("/feedback", body);
                let data = response.data;
                console.log(data);
                toast({
                  title: "Feedback Received",
                  description: "Thank you for your feedback :)",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              } catch (err) {
                toast({
                  title: "Submission Failed",
                  description:
                    "You have already provided a feedback for this event",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
                console.log(err);
              }
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
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
                <FeedbackRadioTable
                  names={["communication", "PM", "PS", "teamwork"]}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
                <FormControl
                  isInvalid={!!errors.reflection && touched.reflection}
                >
                  <FormLabel fontSize="md" paddingTop={10} paddingBottom={5}>
                    REFLECTION - Please reflect on your experiences during this
                    activity and identify how each component of the activity has
                    helped you to develop your employability skills.
                  </FormLabel>
                  <Field
                    as={Textarea}
                    size="md"
                    minHeight={100}
                    placeholder="Your answer"
                    id="reflection"
                    name="reflection"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.reflection}</FormErrorMessage>
                </FormControl>
              </Stack>
              <Button
                colorScheme="teal"
                size="md"
                marginTop={10}
                bgColor={"#006DAE"}
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default FeedbackForm;
