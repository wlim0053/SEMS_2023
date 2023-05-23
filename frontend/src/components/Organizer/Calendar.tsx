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

function Calendar() {
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

  const events = [
    {
      title: "MUM Event",
      start: "2023-04-05T08:00:00",
      end: "2023-04-05T09:00:00",
      description: "This is a MUM event",
    },
    {
      title: "MUM Event 2",
      start: "2023-05-02T12:26:00",
      end: "2023-05-02T13:00:00",
      description: "This is a MUM event",
    },
    {
      title: "MUM Event 3",
      start: "2023-05-04T12:26:00",
      end: "2023-05-04T13:00:00",
      description: "This is a MUM event",
    }
  ];

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