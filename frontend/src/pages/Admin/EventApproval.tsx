import React, { useState, useEffect } from "react";
import { Route, Outlet, useNavigate } from "react-router-dom";
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
  List,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
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
          <option value="option1">Club</option>
          <option value="option2">Name</option>
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
      </Table>
      <Outlet />
    </Box>
  );
};

export default EventApproval;
