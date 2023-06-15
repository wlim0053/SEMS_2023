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
import "./CalendarStyle.css";

function Calendar() {
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
  const [events, setEvents] = useState<Event[]>([]);

  interface Event {
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchEventsFromDatabase = async () => {
    const response = await fetch("http://localhost:3000/api/event");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchEventsFromDatabase()
      .then((data) => {
        const transformedEvents = data.map((event: Event) => ({
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
        setEvents(transformedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
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
            <Button colorScheme="blue" mr={-3} onClick={() => setModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Calendar;
