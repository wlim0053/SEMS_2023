import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import api from "../../utils/api";

interface ParticipationData {
  event_uuid: string;
  participation_attendance: number;
  participation_semester: number;
  participation_uuid: string;
  participation_year: number;
  spec_uuid: string;
  user_access_lvl: string;
  user_email: string;
  user_enrolment_semester: number;
  user_enrolment_year: number;
  user_fire_id: string;
  user_fname: string;
  user_gender: number;
  user_id: number;
  user_lname: string;
}

interface AttendanceFormProps {
  event_uuid: string;
}

function AttendanceForm({ event_uuid }: AttendanceFormProps) {
  const [participationData, setParticipationData] = useState<
    ParticipationData[]
  >([]);
  const [refreshAttendance, setRefreshAttendance] = useState(false);

  const fetchParticipationFromDatabase = async () => {
    const response = await api.get(
      `/event/for-organiser/${event_uuid}/participation`
    );
    return response.data;
  };

  const toggleAttendanceInDatabase = async (
    participation_uuid: string,
    toggled_participation_attendance: number
  ) => {
    try {
      let bodyForAttendance = {
        participation_attendance: toggled_participation_attendance,
      };
      let response = await api.patch(
        `/participation/${participation_uuid}/attendance`,
        bodyForAttendance
      );
      console.log(response.data); // Response data from the server
    } catch (error) {
      console.log(`Error: ${error}`);
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    fetchParticipationFromDatabase()
      .then((data) => {
        setParticipationData(data);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
      });
  }, []);

  useEffect(() => {
    if (refreshAttendance) {
      fetchParticipationFromDatabase()
        .then((data) => {
          setParticipationData(data);
          setRefreshAttendance(false);
        })
        .catch((error) => {
          console.error("Error fetching event:", error);
          setRefreshAttendance(false);
        });
    }
  }, [refreshAttendance]);

  return (
    <Formik
      initialValues={participationData.reduce(
        (values, participation) => ({
          ...values,
          [participation.participation_uuid]:
            participation.participation_attendance === 1,
        }),
        {}
      )}
      onSubmit={async (values) => {
        try {
          const promises = Object.keys(values).map((participation_uuid) =>
            toggleAttendanceInDatabase(
              participation_uuid,
              values[participation_uuid] ? 1 : 0
            )
          );
          await Promise.all(promises);
          setRefreshAttendance(true);
          console.log("Attendance updated successfully");
        } catch (error) {
          console.error("Error updating attendance:", error);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Student ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Attendance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {participationData.map((participation, index) => (
                <Tr key={participation.participation_uuid}>
                  <Td>{index + 1}</Td>
                  <Td>{participation.user_id}</Td>
                  <Td>
                    {participation.user_fname} {participation.user_lname}
                  </Td>
                  <Td>{participation.user_email}</Td>
                  <Td>
                    <Field
                      type="checkbox"
                      name={participation.participation_uuid}
                      as={Checkbox}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button colorScheme="blue" mt={4} type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default AttendanceForm;
