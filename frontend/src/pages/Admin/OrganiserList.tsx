import React from 'react';
import { Route, Outlet } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

function OrganiserList() {
  return (
    <Box>
      {/* Heading */}
      <Text fontSize="3xl" fontWeight="bold" mt={8} mb={4}>
        Organiser List
      </Text>

      {/* Render the nested routes using Outlet */}
      <Outlet />
    </Box>
  );
}

export default OrganiserList;
