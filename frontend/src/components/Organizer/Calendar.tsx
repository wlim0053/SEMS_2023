import React, { useEffect, useState } from "react";
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
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import "./CalendarStyle.css";

interface EventData {
  event_uuid: string;
  event_ems_no: string | null;
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
  organiser_uuid: string;
  parent_uuid: string | null;
  organiser_name: string;
  stu_fire_id: string;
}

function Calendar({ eventData }: { eventData: EventData[] }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const handleViewClick = () => {
    window.location.href = '/EventDetailsDashboard';
  };

  const handleEditClick = () => {
    window.location.href = '/CreateEventForm';
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setTitle(clickInfo.event.title);
    setDescription(clickInfo.event.extendedProps.description);
    setEventDate(
      clickInfo.event.start ? clickInfo.event.start.toLocaleDateString() : ""
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
    setModal(true);
  };

  const handleEventHover = (hoverInfo: EventHoveringArg) => {
    hoverInfo.el.style.cursor = "pointer";
  };

  const events = eventData.map((event) => ({
    title: event.event_title,
    start: event.event_start_date,
    description: event.event_venue + " - " + event.organiser_name,
  }));

  return (
    <div
      className="calendar"
      style={{
        fontFamily: "Arial Narrow, sans-serif",
        padding: 0,
        margin: "20px 30px",
        lineHeight: 1.5,
      }}
    >
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
                    <p>Date: {eventDate}</p>
                    <p>Start Time: {startTime}</p>
                    <p>End Time: {endTime}</p>
            </Box>
                </ModalBody>
                <ModalFooter>
            <Box w="100%" p={2} bg="#EDEEEE" display="flex" justifyContent={["center", "space-between"]} alignItems="center" pl={4} pr={4}>
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

              <Button colorScheme="blue" mr={-3} onClick={() => setModal(false)}>
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
