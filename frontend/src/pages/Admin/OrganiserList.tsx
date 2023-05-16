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
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { BiUpload } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import Popup from "../../components/Popup";

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

  const headers = [
    { key: "id", value: "ID" },
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
    { key: "club", value: "Club" },
    { key: "actions", value: "Actions", disableSorting: true },
  ];

  type sortField = "ID" | "Name" | "Club" | "Email";
  //const [organiser, setOrganiser] = useState(organiserList);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<sortField>("Name");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value as sortField);
  };

  const addOrEditOrganiser = (organiser: any) => {};

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
        <Input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for an organiser"
          width="20%"
        />
        <Text px={5}>Sort by: </Text>
        <Select
          variant="outline"
          placeholder="--select an option--"
          width="20%"
          onChange={handleSort}
          value={selected}
        >
          <option value="option1">Club</option>
          <option value="option2">Name</option>
        </Select>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="telegram"
          ml="auto"
          variant="solid"
          onClick={onOpen}
          ref={finalRef}
        >
          Add organiser
        </Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Club</FormLabel>
              <Input placeholder="Club" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Import Organiser (CSV)</FormLabel>
              <Button
                leftIcon={<BiUpload />}
                colorScheme="blue"
                variant="outline"
              >
                Add File
              </Button>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
          {organiserList
            .filter((organiser) => {
              return searchTerm.toLowerCase() === ""
                ? organiser
                : organiser.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
            .map((organiser) => (
              <Tr>
                <Td>{organiser.id}</Td>
                <Td>{organiser.name}</Td>
                <Td>{organiser.email}</Td>
                <Td>{organiser.club}</Td>
                <Td>
                  <HStack spacing={3}>
                    <IconButton
                      colorScheme="blue"
                      variant="outline"
                      aria-label="Edit Organiser"
                      icon={<MdOutlineModeEdit />}
                    ></IconButton>
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      aria-label="Edit Organiser"
                      icon={<CloseIcon />}
                    ></IconButton>
                  </HStack>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Outlet />
    </Box>
  );
}

export default OrganiserList;
