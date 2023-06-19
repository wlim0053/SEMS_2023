import { Field } from "formik";
import {
  Stack,
  Radio,
  RadioGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

interface Props {
  names: string[];
  errors: object;
  touched: object;
  handleBlur: (e) => void;
  handleChange: (e) => void;
}

function FeedbackRadioTable({
  names,
  errors,
  touched,
  handleBlur,
  handleChange,
}: Props) {
  return (
    <>
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
            {names.map((name) => (
              <Tr key={name}>
                <Td paddingRight={20}>
                  {name[0].toUpperCase() + name.substring(1, name.length)}
                </Td>
                <Td colSpan={3}>
                  <FormControl isInvalid={!!errors[name] && touched[name]}>
                    <RadioGroup
                      id={name}
                      name={name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      marginLeft={4}
                    >
                      <Stack direction="row" spacing={180}>
                        <Field value="1" as={Radio}></Field>
                        <Field value="2" as={Radio}></Field>
                        <Field value="3" as={Radio}></Field>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{errors[name]}</FormErrorMessage>
                  </FormControl>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default FeedbackRadioTable;
