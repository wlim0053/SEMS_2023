import { useState, useRef } from "react";
import {
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  IconButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  ViewIcon,
  CheckIcon,
  StarIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import React from "react";

interface EventData {
  event_uuid: string;
  organiser_uuid: string;
  event_ems_no: string | null;
  event_ems_link: string | null;
  event_start_date: string;
  event_end_date: string;
  event_title: string;
  event_desc: string;
  event_mode: string;
  event_venue: string;
  event_capacity: number;
  event_status: string;
  event_reg_start_date: string;
  event_reg_end_date: string;
  event_reg_google_form: string;
  no_participants: number;
  parent_uuid: string | null;
  organiser_name: string;
  user_fire_id: string;
}

interface GridEventSectionsProps {
  data: EventData[];
  setRefreshGrid: (refresh: boolean) => void;
}

function GridEventSections({ data, setRefreshGrid }: GridEventSectionsProps) {
  const navigate = useNavigate();
  const [selectedEventUUID, setSelectedEventUUID] = useState("");

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const onDeleteConfirmationClose = () => setIsDeleteConfirmationOpen(false);

  const [
    isMarkAsCompletedConfirmationOpen,
    setIsMarkAsCompletedConfirmationOpen,
  ] = useState(false);
  const onMarkAsCompletedConfirmationClose = () =>
    setIsMarkAsCompletedConfirmationOpen(false);

  const [
    isSendCertificateConfirmationOpen,
    setIsSendCertificateConfirmationOpen,
  ] = useState(false);
  const onSendCertificateConfirmationClose = () =>
    setIsSendCertificateConfirmationOpen(false);

  const [isSendEmailConfirmationOpen, setIsSendEmailConfirmationOpen] =
    useState(false);
  const onSendEmailConfirmationClose = () =>
    setIsSendEmailConfirmationOpen(false);

  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const viewedEventData = data[index];
    navigate("/EventDetailsDashboard", {
      state: { viewedEventData },
    });
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const eventDataUUID = data[index].event_uuid;
    console.log("Event UUID: " + eventDataUUID);
    navigate("/EditEventPage", { state: { eventDataUUID } });
  };

  const deleteEventFromDatabase = async () => {
    try {
      let response = await api.delete(
        `/event/for-organiser/${selectedEventUUID}`
      );
      console.log(response.data); // Response data from the server
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.log(`Error: ${error}`);
      // Handle the error appropriately
    }
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    setSelectedEventUUID(data[index].event_uuid);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDeleteClick = () => {
    deleteEventFromDatabase();
    setRefreshGrid(true); // Trigger refresh of events data of grid
    onDeleteConfirmationClose(); // Close the alert dialog after form deletion
  };

  const markEventAsCompletedInDatabase = async () => {
    try {
      let response = await api.patch(
        `/event/for-organiser/${selectedEventUUID}/complete`
      );
      console.log(response.data); // Response data from the server
      // Handle the response or perform any necessary actions
      setRefreshGrid(true); // Trigger refresh of events data of grid
    } catch (error) {
      console.log(`Error: ${error}`);
      // Handle the error appropriately
    }
  };

  const handleMarkAsCompletedClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const completedEventUUID = data[index].event_uuid;
    setSelectedEventUUID(completedEventUUID);
    console.log("Selected Event UUID (1st Stage): ", data[index]);
    setIsMarkAsCompletedConfirmationOpen(true);
  };

  const handleConfirmMarkAsCompletedClick = () => {
    markEventAsCompletedInDatabase();
    setRefreshGrid(true); // Trigger refresh of events data of grid
    onDeleteConfirmationClose(); // Close the alert dialog after form deletion
  };

  const sendCertificate = async () => {
    try {
      let bodyForOrganiser = {
        organisedBy: "MUMTEC",
      };

      let response = await api.post(
        `/event/for-organiser/${selectedEventUUID}/cert`,
        bodyForOrganiser
      );
      console.log(response.data); // Response data from the server
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.log(`Error: ${error}`);
      // Handle the error appropriately
    }
  };

  const handleSendCertificateClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const certificatedEventUUID = data[index].event_uuid;
    setSelectedEventUUID(certificatedEventUUID);
    console.log("Selected Event UUID: ", data[index]);
    setIsSendCertificateConfirmationOpen(true);
  };

  const handleConfirmSendCertificateClick = () => {
    sendCertificate();
    onSendCertificateConfirmationClose(); // Close the alert dialog after form deletion
  };

  const sendReminderEmail = async () => {
    try {
      let response = await api.post(
        `/event/for-organiser/${selectedEventUUID}/reminder`
      );
      console.log(response.data); // Response data from the server
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.log(`Error: ${error}`);
      // Handle the error appropriately
    }
  };

  const handleReminderEmailClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const emailedEventUUID = data[index].event_uuid;
    setSelectedEventUUID(emailedEventUUID);
    console.log("Selected Event UUID: ", data[index]);
    setIsSendEmailConfirmationOpen(true);
  };

  const handleConfirmReminderEmailClick = () => {
    sendReminderEmail();
    console.log("Selected Event UUID: " + selectedEventUUID);
    onSendEmailConfirmationClose(); // Close the alert dialog after form deletion
  };

  const dateFormatter = (event_start_date: string): string => {
    const date = new Date(event_start_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  };

  const getStatusString = (status: string): string => {
    switch (status) {
      case "D":
        return "Draft";
      case "P":
        return "Pending";
      case "A":
        return "Approved";
      case "R":
        return "Rejected";
      case "C":
        return "Completed";
      default:
        return "";
    }
  };

  const shouldShowEditButton = (status: string): boolean => {
    return status == "D";
  };

  const shouldShowDeleteButton = (status: string): boolean => {
    return status == "D" || status == "A" || status == "R" || status == "C";
  };

  const shouldShowMarkAsCompletedButton = (
    status: string,
    event_start_date: string
  ): boolean => {
    return new Date(event_start_date) < new Date() && status != "C";
  };

  const shouldShowReminderEmailButton = (status: string): boolean => {
    return status == "A";
  };

  const shouldShowSendCertificateButton = (status: string): boolean => {
    return status == "C";
  };

  return (
    <>
      {data.map((event, index) => (
        <React.Fragment key={index}>
          <Box
            w="100%"
            h="76"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
              {event.event_title}
            </Text>
          </Box>
          <Box
            w="100%"
            h="76"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
              {event.event_venue}
            </Text>
          </Box>
          <Box
            w="100%"
            h="76"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
              {event.organiser_name}
            </Text>
          </Box>
          <Box
            w="100%"
            h="76"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
              {event.no_participants + "/" + event.event_capacity}
            </Text>
          </Box>
          <Box
            w="100%"
            h="76"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
              {dateFormatter(event.event_start_date)}
            </Text>
          </Box>
          <Box
            w="100%"
            h="76"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
              {getStatusString(event.event_status)}
            </Text>
          </Box>
          <Box
            w="100%"
            h="76"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            pl={"45px"}
            pr={"45px"}
            pt={"15px"}
            pb={"15px"}
          >
            <Grid
              templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]} // Adjust the number of columns as per your requirement
              gap={2} // Adjust the gap between buttons if needed
            >
              <GridItem colSpan={[1, 1]}>
                <IconButton
                  colorScheme="blue"
                  aria-label="View Event"
                  icon={<ViewIcon />}
                  size={"sm"}
                  onClick={handleViewClick}
                  data-index={index}
                />
              </GridItem>

              {shouldShowEditButton(event.event_status) ? (
                <GridItem colSpan={[1, 1]}>
                  <IconButton
                    colorScheme="blue"
                    aria-label="Edit Event"
                    icon={<EditIcon />}
                    size={"sm"}
                    onClick={handleEditClick}
                    data-index={index}
                  />
                </GridItem>
              ) : null}

              {shouldShowMarkAsCompletedButton(
                event.event_status,
                event.event_start_date
              ) ? (
                <GridItem colSpan={[1, 1]}>
                  <IconButton
                    colorScheme="blue"
                    aria-label="Mark as Completed"
                    icon={<CheckIcon />}
                    size={"sm"}
                    onClick={handleMarkAsCompletedClick}
                    data-index={index}
                  />
                </GridItem>
              ) : null}

              {shouldShowSendCertificateButton(event.event_status) ? (
                <GridItem colSpan={[1, 1]}>
                  <IconButton
                    colorScheme="blue"
                    aria-label="Send certificate"
                    icon={<StarIcon />}
                    size={"sm"}
                    onClick={handleSendCertificateClick}
                    data-index={index}
                  />
                </GridItem>
              ) : null}

              {shouldShowReminderEmailButton(event.event_status) ? (
                <GridItem colSpan={[1, 1]}>
                  <IconButton
                    colorScheme="blue"
                    aria-label="Send reminder email"
                    icon={<EmailIcon />}
                    size={"sm"}
                    onClick={handleReminderEmailClick}
                    data-index={index}
                  />
                </GridItem>
              ) : null}

              {shouldShowDeleteButton(event.event_status) ? (
                <GridItem colSpan={[1, 1]}>
                  <IconButton
                    colorScheme="red"
                    aria-label="Delete Event"
                    icon={<DeleteIcon />}
                    size={"sm"}
                    onClick={handleDeleteClick}
                    data-index={index}
                  />
                </GridItem>
              ) : null}
            </Grid>
          </Box>
        </React.Fragment>
      ))}

      <AlertDialog
        isOpen={isDeleteConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteConfirmationClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirmation: Delete Event</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete the form?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteConfirmationClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleConfirmDeleteClick}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isMarkAsCompletedConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={onMarkAsCompletedConfirmationClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Mark This Event As Completed</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to mark this event as completed?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onMarkAsCompletedConfirmationClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleConfirmMarkAsCompletedClick}
              >
                Completed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isSendEmailConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={onSendEmailConfirmationClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Send out Reminder Email</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to send reminder emails for this event?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onSendEmailConfirmationClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleConfirmReminderEmailClick}
              >
                Send
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isSendCertificateConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={onSendCertificateConfirmationClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Send out Certificate</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to send out the certificates for this event?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onSendCertificateConfirmationClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleConfirmSendCertificateClick}
              >
                Send
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default GridEventSections;
