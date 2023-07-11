import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Checkbox,
  Button,
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
  isStatusCompleted: boolean;
}

function AttendanceForm({
  event_uuid,
  isStatusCompleted,
}: AttendanceFormProps) {
  const [participationData, setParticipationData] = useState<
    ParticipationData[]
  >([]);
  const [absenteeCount, setAbsenteeCount] = useState(0);
  const [attendedCount, setAttendedCount] = useState(0);
  const [turnOutRateCount, setTurnOutRateCount] = useState(0);
  const [hasNoAttendee, setHasNoAttendee] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const fetchParticipationFromDatabase = async () => {
    const response = await api.get(
      `/event/for-organiser/${event_uuid}/participation`
    );

    setHasNoAttendee(response.data.length == 0);

    // Convert boolean values to numbers
    const formattedData = response.data.map((participation) => ({
      ...participation,
      participation_attendance: participation.participation_attendance ? 1 : 0,
    }));

    console.log(formattedData);
    setParticipationData(formattedData);
    return formattedData;
  };

  const toggleAttendanceInDatabase = async (
    participation_uuid: string,
    toggled_participation_attendance: number
  ) => {
    try {
      console.log(
        "toggleAttendance || " +
          participation_uuid +
          ": " +
          toggled_participation_attendance
      );
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

  return (
    <>
      <Formik
        initialValues={{
          // Initialize the form values with checked checkboxes
          ...participationData.reduce(
            (values, participation) => ({
              ...values,
              [participation.participation_uuid]:
                participation.participation_attendance === 1,
            }),
            {}
          ),
        }}
        onSubmit={async (values) => {
          try {
            console.log("Formik submitted with values:");
            console.log(values);

            // Convert the values object into an array of participations
            const participations = participationData.map((participation) => {
              const isChecked = values[participation.participation_uuid];
              return {
                participation_uuid: participation.participation_uuid,
                participation_attendance: isChecked
                  ? 1
                  : participation.participation_attendance,
              };
            });

            if (!isStatusCompleted) {
              const promises = participations.map((participation) =>
                toggleAttendanceInDatabase(
                  participation.participation_uuid,
                  participation.participation_attendance
                )
              );
              await Promise.all(promises);
              console.log("Attendance updated successfully");
            }

            const attendedCount = participations.reduce(
              (count, participation) =>
                count + (participation.participation_attendance === 1 ? 1 : 0),
              0
            );
            const absenteeCount = participations.length - attendedCount;
            const turnoutRate = (attendedCount / participations.length) * 100;
            setAttendedCount(attendedCount);
            setAbsenteeCount(absenteeCount);
            setTurnOutRateCount(turnoutRate);

            setIsOpen(true);
          } catch (error) {
            console.error("Error updating attendance:", error);
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Table size="sm">
              <Thead>{/* ... */}</Thead>
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
                        name={participation.participation_uuid}
                        type="checkbox"
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            isChecked={
                              participation.participation_attendance === 1
                            }
                            onChange={(e) => {
                              field.onChange(e);
                              const isChecked = e.target.checked;
                              setParticipationData((prevData) =>
                                prevData.map((prevParticipation) => {
                                  if (
                                    prevParticipation.participation_uuid ===
                                    participation.participation_uuid
                                  ) {
                                    return {
                                      ...prevParticipation,
                                      participation_attendance: isChecked
                                        ? 1
                                        : 0,
                                    };
                                  }
                                  return prevParticipation;
                                })
                              );
                            }}
                            isDisabled={isStatusCompleted}
                          />
                        )}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {!hasNoAttendee ? (
              <Button colorScheme="blue" mt={4} type="submit">
                {isStatusCompleted ? "Check Attendance Summary" : "Submit"}
              </Button>
            ) : null}
          </Form>
        )}
      </Formik>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              {isStatusCompleted
                ? "Attendance Summary"
                : "Attendance Submitted"}
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text mb={2}>Present: {attendedCount} students</Text>
              <Text mb={2}>Absent: {absenteeCount} students</Text>
              <Text>Turnout Rate: {turnOutRateCount.toFixed(2)}%</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AttendanceForm;
