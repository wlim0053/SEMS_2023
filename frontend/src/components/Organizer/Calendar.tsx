import { useEffect, useState, useRef } from "react";
import { EventClickArg, EventHoveringArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import "./CalendarStyle.css";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

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

type CalendarProps = {
  setRefreshGrid: (refresh: boolean) => void;
};

function Calendar({ setRefreshGrid }: CalendarProps) {
  const [selectedEventUUID, setSelectedEventUUID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [club, setClub] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [refreshCalendar, setRefreshCalendar] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const handleViewClick = async () => {
    fetchEventFromDatabase()
      .then((data) => {
        let viewedEventData = data;
        navigate("/EventDetailsDashboard", {
          state: { viewedEventData },
        });
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
      });
  };

  const handleEditClick = () => {
    const eventDataUUID = selectedEventUUID;
    navigate("/EditEventPage", {
      state: { eventDataUUID },
    });
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

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  const handleConfirmDeleteClick = () => {
    deleteEventFromDatabase();
    onClose(); // Close the alert dialog after form deletion
    setModal(false); // Close the modal overlay
    setRefreshCalendar(true); // Trigger refresh of events data of calendar
    setRefreshGrid(true); // Trigger refresh of events data of calendar
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchEventFromDatabase = async () => {
    const response = await api.get(`/event/for-organiser/${selectedEventUUID}`);
    console.log(response.data[0]);
    return response.data[0];
  };

  const fetchEventsFromDatabase = async () => {
    const response = await api.get("/event/for-organiser");
    console.log(response.data);
    return response.data;
  };

  const shouldShowEditButton = (status: string): boolean => {
    return status == "D";
  };

  const shouldShowDeleteButton = (status: string): boolean => {
    return status == "D" || status == "A" || status == "R" || status == "C";
  };

  useEffect(() => {
    fetchEventsFromDatabase()
      .then((data) => {
        const transformedEvents = data.map((event: EventData) => ({
          event_uuid: event.event_uuid,
          title: event.event_title,
          start: event.event_start_date,
          end: event.event_end_date,
          description: event.event_desc,
          startDate: new Date(event.event_start_date).toLocaleDateString(
            "en-US",
            { month: "numeric", day: "numeric", year: "numeric" }
          ),
          endDate: new Date(event.event_end_date).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          }),
          venue: event.event_venue,
          club: event.organiser_name,
        }));
        const currentEvents = transformedEvents.filter(
          (event: any) => new Date(event.start) >= new Date()
        );
        setEvents(currentEvents);
        setRefreshCalendar(false); // Reset the refresh flag
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [refreshCalendar]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEventUUID(clickInfo.event.extendedProps.event_uuid);
    setTitle(clickInfo.event.title);
    setDescription(clickInfo.event.extendedProps.description);
    setStartDate(
      clickInfo.event.start ? clickInfo.event.start.toLocaleDateString() : ""
    );
    setEndDate(
      clickInfo.event.end ? clickInfo.event.end.toLocaleDateString() : ""
    );
    if (clickInfo.event.start) {
      setStartTime(
        clickInfo.event.start.toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        })
      );
    }
    if (clickInfo.event.end) {
      setEndTime(
        clickInfo.event.end.toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        })
      );
    }
    setVenue(clickInfo.event.extendedProps.venue);
    setClub(clickInfo.event.extendedProps.club);
    setModal(true);
  };

  const handleEventHover = (hoverInfo: EventHoveringArg) => {
    hoverInfo.el.style.cursor = "pointer";
  };

  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "title",
            center: "",
            end: "prev,next dayGridMonth timeGridWeek today",
          }}
          buttonText={{
            today: "Today",
            month: "Monthly View",
            week: "Weekly View",
            day: "Day",
          }}
          dayHeaderFormat={
            isMobile ? { weekday: "short" } : { weekday: "long" }
          }
          eventTimeFormat={
            isMobile
              ? {
                  hour: "numeric",
                  hour12: true,
                }
              : {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
          }
          height={isMobile ? "auto" : "90vh"}
          events={events}
          eventClick={handleEventClick}
          eventMouseEnter={handleEventHover}
        />

        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontFamily="'Helvetica Neue Condensed', 'Arial Narrow', sans-serif"
              fontWeight="semibold"
              color="#006dac"
              pb={2}
            >
              {title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                fontSize="lg"
                fontFamily="'Helvetica Neue', 'Arial Narrow', sans-serif"
              >
                <p>{description}</p>
                <p>Start Date: {startDate}</p>
                <p>End Date: {endDate}</p>
                <p>Start Time: {startTime}</p>
                <p>End Time: {endTime}</p>
                <p>Venue: {venue}</p>
                <p>Club: {club}</p>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Box
                w="100%"
                p={2}
                bg="#EDEEEE"
                display="flex"
                justifyContent={["center", "space-between"]}
                alignItems="center"
                pl={4}
                pr={4}
              >
                <Tooltip label="View Event" fontSize="md">
                  <IconButton
                    colorScheme="blue"
                    aria-label="View Event"
                    icon={<ViewIcon />}
                    size="sm"
                    onClick={handleViewClick}
                  />
                </Tooltip>

                <Tooltip label="Edit Event" fontSize="md">
                  <IconButton
                    colorScheme="blue"
                    aria-label="Edit Event"
                    icon={<EditIcon />}
                    size="sm"
                    onClick={handleEditClick}
                  />
                </Tooltip>

                <Tooltip label="Delete Event" fontSize="md">
                  <IconButton
                    colorScheme="red"
                    aria-label="Delete Event"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={handleDeleteClick}
                  />
                </Tooltip>

                <Button
                  colorScheme="blue"
                  mr={-3}
                  onClick={() => setModal(false)}
                >
                  Close
                </Button>
              </Box>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirmation: Delete Event</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete the form?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
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
    </>
  );
}

export default Calendar;
