import React, { useState } from "react";
import { Route, Outlet } from "react-router-dom";
import {
  Box,
  Text,
  Input,
  Table,
  Thead,
  Flex,
  Icon,
  Tbody,
  Select,
  Button,
  ButtonGroup,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Wrap,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function OrganiserList() {
  const organiserList = [
    {
      id: 1,
      name: "John Doe",
      club: "Engineering Club",
      email: "abc@student.monash.edu",
      actions: null,
    },
    {
      id: 2,
      name: "Mary Jane",
      club: "Chemistry Club",
      email: "xyz@student.monash.edu",
      actions: null,
    },
    {
      id: 3,
      name: "Lee Sin",
      club: "IT Club",
      email: "hij@student.monash.edu",
      actions: null,
    },
  ];

  // const headers = [
  //   {key: "id", value: "ID"},
  //   {key: "name", value: "Name"},
  //   {key: "club", value: "Club"},
  //   {key: "email", value: "Email"},
  //   {key: "actions", value: "Actions"},
  // ]

  const [organiser, setOrganiser] = useState(organiserList);

  return (
    //add each component to box and add flex or wrap to make it responsive
    <Box width="100%" p={10} overflowX="auto">
      <Text fontSize="4xl">Organiser List</Text>
      <Box
        width="100%"
        pt={5}
        pb={5}
        overflowX="auto"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Input placeholder="Search for an organiser" width="20%" />
        <Text px={5}>Sort by: </Text>
        <Select
          variant="outline"
          placeholder="--select an option--"
          width="20%"
        >
          <option value="option1">Club</option>
          <option value="option2">Name</option>
        </Select>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="telegram"
          ml="auto"
          variant="solid"
        >
          Add organiser
        </Button>
      </Box>

      <Table variant="striped">
        <Thead bg="#006DAE">
          <Tr>
            <Th color="white">No.</Th>
            <Th color="white">Name</Th>
            <Th color="white">Email</Th>
            <Th color="white">Club</Th>
            <Th color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {organiser.map((organiser) => (
            <Tr>
              <Td>{organiser.id}</Td>
              <Td>{organiser.name}</Td>
              <Td>{organiser.email}</Td>
              <Td>{organiser.club}</Td>
              <Td>{organiser.actions}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Outlet />
    </Box>
  );
}

export default OrganiserList;
