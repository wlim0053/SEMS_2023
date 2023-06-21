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
} from "@chakra-ui/react";
import api from "../utils/api";
import FeedbackRadioTable from "./FeedbackRadioTable";

const FeedbackFormSchema = Yup.object().shape({
  communication: Yup.string().required("Required"),
  PM: Yup.string().required("Required"),
  PS: Yup.string().required("Required"),
  teamwork: Yup.string().required("Required"),
  reflection: Yup.string().required("Required"),
});

const FeedbackForm = () => {
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
                participation_uuid: "8AEB18BB-4A51-4366-8ACC-C86A9CFA3F0F",
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
                alert("Feedback has been submitted");
              } catch (err) {
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
