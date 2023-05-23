import React, {useState} from 'react';
import { Route, Outlet, Link } from 'react-router-dom';
import { Box, Text, Select, Table, Thead, Tbody, Tr, Th, Td, Flex, Button, Spacer } from '@chakra-ui/react';

function ActivityLog() {
  const activities = [
    { id: 1, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 2, date: '2023-05-13', time: '02:30 PM', description: 'Valorant Time' },
    { id: 3, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 4, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Organiser Family' },
    { id: 5, date: '2023-05-13', time: '02:30 PM', description: 'League Time' },
    { id: 6, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 7, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 8, date: '2023-05-13', time: '02:30 PM', description: 'CSGO Time' },
    { id: 9, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 10, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 11, date: '2023-05-13', time: '02:30 PM', description: 'Apex Time' },
    { id: 12, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 13, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 14, date: '2023-05-13', time: '02:30 PM', description: 'Valorant Time' },
    { id: 15, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 16, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 17, date: '2023-05-13', time: '02:30 PM', description: 'Valorant Time' },
    { id: 18, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 19, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 20, date: '2023-05-13', time: '02:30 PM', description: 'Valorant Time' },
    { id: 21, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 22, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 23, date: '2023-05-13', time: '02:30 PM', description: 'Valorant Time' },
    { id: 24, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 25, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 26, date: '2023-05-13', time: '02:30 PM', description: 'Valorant Time' },
    { id: 27, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 80, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 29, date: '2023-05-13', time: '02:30 PM', description: 'Valorant Time' },
    { id: 30, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
    { id: 31, date: '2023-05-14', time: '09:00 AM', description: 'Meeting with darling Admin Family' },
    { id: 32, date: '2023-05-13', time: '02:30 PM', description: 'Valorant Time' },
    { id: 33, date: '2023-05-12', time: '11:15 AM', description: 'Email to Lionel Pepsi' },
  ];

  const [sortValue, setSortValue] = useState("50");

  const handleSortChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSortValue(event.target.value);
  };

  return (
    <Box px={6} py={8} w="100%">
      {/* Heading */}
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        Recent Activity List
      </Text>

      {/* Sorting dropdown */}
      <Flex align="center" justify="space-between" mb={4}>
        <Select placeholder="Sort by" w={1/4} onChange={handleSortChange}>
          <option value="5">5 activities</option>
          <option value="10">10 activities</option>
          <option value="15">15 activities</option>
          <option value="20">20 activities</option>
        </Select>
        <Spacer />
      </Flex>

      {/* Activity list table */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Activity description</Th>
          </Tr>
        </Thead>
        <Tbody>
        {activities.slice(0, parseInt(sortValue, 10)).map((activity, index) => (
            <Tr key={activity.id}>
              <Td>{index + 1}</Td>
              <Td>{activity.date}</Td>
              <Td>{activity.time}</Td>
              <Td>{activity.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Page selection button */}
      <Flex align="center" justify="flex-end" mt={4}>
        <Button as={Link} to="#" mr={2} size="sm">1</Button>
        <Button as={Link} to="#" mr={2} size="sm">2</Button>
        <Button as={Link} to="#" size="sm">3</Button>
      </Flex>

      {/* Render the nested routes using Outlet */}
      <Outlet />
    </Box>
  );
}

export default ActivityLog;