import React, { useState, useEffect } from "react";
import { Route, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Input,
  Table,
  Thead,
  Tbody,
  Select,
  Button,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Wrap,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  CloseButton,
  IconButton,
  Stack,
  HStack,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { BiUpload } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import api from "../../utils/api";

const EventApproval = () => {
  const headers = [
    { key: "eventName", value: "Event" },
    { key: "organiserEmail", value: "Email" },
    { key: "eventStatus", value: "Statuts" },
    /* clickable string to store the response from EMS */
    { key: "eventDetails", value: "Details" },
    { key: "actions", value: "Actions", disableSorting: true },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  type sortField = "Event" | "Status" | "Email";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState<sortField>("Event");

  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const history = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value as sortField);
  };

  return (
    //add each component to box and add flex or wrap to make it responsive
    <Box width="100%" p="10" overflowX="auto">
      <Text fontSize="4xl"> Event Approval</Text>
      <Box
        width="100%"
        pt={5}
        pb={5}
        overflowX="auto"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for an event"
          width="20%"
        />
        <Text px={5}>Sort by: </Text>
        <Select
          variant="outline"
          placeholder="--select an option--"
          width="20%"
          onChange={handleSort}
          value={selectedSort}
        >
          <option value="option1">Status</option>
          <option value="option2">Event</option>
        </Select>
      </Box>

      <Table variant="striped">
        <Thead bg="#006DAE">
          <Tr>
            {headers.map((header) => (
              <Td color="white" key={header.key}>
                {header.value}
              </Td>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Event1</Td>
            <Td>abc@student.monash.edu</Td>
            <Td>Pending</Td>
            <Td>View More</Td>
            <Td>
              <HStack spacing={3}>
                <Button
                  colorScheme="whatsapp"
                  variant="outline"
                  border="2px"
                  leftIcon={<CheckIcon />}
                  onClick={onOpen}
                >
                  Approve
                </Button>
                <Button
                  colorScheme="red"
                  variant="outline"
                  border="2px"
                  leftIcon={<CloseIcon />}
                >
                  Reject
                </Button>
              </HStack>
            </Td>
          </Tr>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Approval of Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>EMS Number</FormLabel>
                  <Input placeholder="EMS Number" />
                </FormControl>
              </ModalBody>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>EMS Link</FormLabel>
                  <Input placeholder="EMS Link" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Tbody>
      </Table>
      <Outlet />
    </Box>
  );
};

export default EventApproval;
