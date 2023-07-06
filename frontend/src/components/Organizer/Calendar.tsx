import { useEffect, useState } from "react";
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


function Calendar() {
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
  const [isMobile, setIsMobile] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  
  const fetchEventsFromDatabase = async () => {
    const response = await api.get("/event/for-organiser");
    console.log(response.data);
    return response.data;
  };

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate("/EventDetailsDashboard", {
      state: { selectedEventUUID },
    });
  };

  const handleEditClick = () => {
    navigate("/EditEventPage", {
      state: { selectedEventUUID },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);



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
          (event:any) => new Date(event.start) >= new Date()
        );
        setEvents(currentEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

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
        dayHeaderFormat={isMobile ? { weekday: "short" } : { weekday: "long" }}
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
              <IconButton
                colorScheme="blue"
                aria-label="View Event"
                icon={<ViewIcon />}
                size="sm"
                onClick={handleViewClick}
              />

              <IconButton
                colorScheme="blue"
                aria-label="Reorganise Event"
                icon={<EditIcon />}
                size="sm"
                onClick={handleEditClick}
              />

              <IconButton
                colorScheme="blue"
                aria-label="Delete Event"
                icon={<DeleteIcon />}
                size="sm"
              />

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
  );
}

export default Calendar;




