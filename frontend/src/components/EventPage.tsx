import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

interface Event {
  id: number;
  name: string;
  category: string;
  eventStart: Date;
  venue: string;
  description: string;
}

interface DisplayTableProps {
  // Required properties can be added here
  // ...
}

const DisplayTable = (props: DisplayTableProps) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // For fetching events data here using axios and setEvents
    // ...
  }, []);

  const formatDate = (date: Date): string => {
    return dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM TT');
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Event No.</Th>
            <Th>Event Name</Th>
            <Th>Club</Th>
            <Th>Date</Th>
            <Th>Venue</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((event, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{event.name}</Td>
              <Td>{event.category}</Td>
              <Td>{formatDate(event.eventStart)}</Td>
              <Td>{event.venue}</Td>
              <Td>{event.description}</Td>
              <Td>
                <Link to={`/SignUp/${event.id}`}>
                  <button className="btn btn-view" id="signUp">
                    Sign Up
                  </button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default DisplayTable;
