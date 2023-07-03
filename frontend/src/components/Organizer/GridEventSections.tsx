import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  updateEventData: () => void;
}

function GridEventSections({ data, updateEventData }: GridEventSectionsProps) {
  const navigate = useNavigate();

  const handleViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const eventData = data[index];
    navigate("/EventDetailsDashboard", {
      state: { eventData },
    });
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const eventDataUUID = data[index].event_uuid;
    console.log("Event UUID: " + eventDataUUID);
    navigate("/EditEventPage", { state: { eventDataUUID } });
  };

  const deleteEventFromDatabase = async (eventId: String) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/event/${eventId}`
      );
      console.log(response.data); // Optional: Log the response data after successful deletion
      updateEventData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const eventData = data[index];
    deleteEventFromDatabase(eventData.event_uuid);
  };

  const dateFormatter = (event_start_date: string): string => {
    const date = new Date(event_start_date);
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      {data.map((event, index) => (
        <React.Fragment key={index}>
          <Box
            w="100%"
            h="71"
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
            h="71"
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
            h="71"
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
            h="71"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
              {
                event.no_participants + "/" + event.event_capacity
              }
            </Text>
          </Box>
          <Box
            w="100%"
            h="71"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
              { dateFormatter(event.event_start_date)}
            </Text>
          </Box>
          <Box
            w="100%"
            h="71"
            bg={index % 2 === 0 ? "#FFFFFF" : "#EDEEEE"}
            display="flex"
            justifyContent={["center", "space-between"]}
            alignItems={"center"}
            pl={"45px"}
            pr={"45px"}
          >
            <IconButton
              colorScheme="blue"
              aria-label="View Event"
              icon={<ViewIcon />}
              size={"sm"}
              onClick={handleViewClick}
              data-index={index}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Edit Event"
              icon={<EditIcon />}
              size={"sm"}
              onClick={handleEditClick}
              data-index={index}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Delete Event"
              icon={<DeleteIcon />}
              size={"sm"}
              onClick={handleDeleteClick}
              data-index={index}
            />
          </Box>
        </React.Fragment>
      ))}
    </>
  );
}

export default GridEventSections;
