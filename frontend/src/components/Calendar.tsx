import React, { useState } from "react";
import {EventClickArg} from "@fullcalendar/core";
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
} from "@chakra-ui/react";

function Calendar() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleEventClick = (clickInfo: EventClickArg) => {
    setTitle(clickInfo.event.title);
    setDescription(clickInfo.event.extendedProps.description);
    setEventDate(clickInfo.event.start ? clickInfo.event.start.toLocaleDateString() : "");
    if (clickInfo.event.start) {
      setStartTime(clickInfo.event.start.toLocaleTimeString([], {hour: 'numeric', minute:'numeric'}));
    }
    if (clickInfo.event.end) {
      setEndTime(clickInfo.event.end.toLocaleTimeString([], {hour: 'numeric', minute:'numeric'}));
    }
    setModal(true);
  };

  const events = [
    {
      title: "MUM Event",
      start: "2023-04-05T08:00:00",
      end: "2023-04-05T09:00:00",
      description: "This is a MUM event",
    },
  ];

  return (
    <div
      style={{
        font: "Roboto Condensed",
        fontWeight: 500,
        padding: "0px",
        marginLeft: "30px",
        marginRight: "30px",
        marginTop: "20px",
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        height={"90vh"}
        events={events}
        eventClick={handleEventClick}
      />
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{description}</p>
            <p>Date: {eventDate}</p>
            <p>Start Time: {startTime}</p>
            <p>End Time: {endTime}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Calendar;
