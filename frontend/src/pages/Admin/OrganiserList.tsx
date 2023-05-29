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
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { BiUpload } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import api from "../../utils/api";

function OrganiserList() {
  const headers = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
    { key: "club", value: "Club" },
    { key: "actions", value: "Actions", disableSorting: true },
  ];

  type sortField = "ID" | "Name" | "Club" | "Email";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState<sortField>("Name");

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputClub, setInputClub] = useState("");

  const [organisers, setOrganiser] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  //get data from api whenever the organinser list's length changes
  const fetchOrganiser = async () => {
    try {
      const response = await api.get("/organiser");
      setOrganiser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //run fetchOrganiser when the page loads
  useEffect(() => {
    fetchOrganiser();
  }, []);

  //json body for adding organiser
  const bodyAdmin = {
    organiser_name: inputName,
    parent_uuid: null,
    stu_fire_id: inputEmail,
  };

  //add organiser to database using post
  const addOrganiser = async (e: any) => {
    e.preventDefault();
    console.log(bodyAdmin);
    try {
      const response = await api.post("/organiser", bodyAdmin);
      const allOrganiser: any = [...organisers, response.data];
      setOrganiser(allOrganiser);
      setInputName("");
      setInputEmail("");
      toast({
        title: "Organiser added!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //function to delete organiser by calling api delete
  const deleteOrganiser = async (id: any) => {
    try {
      if (window.confirm("Are you sure you want to delete this organiser?")) {
        await api.delete(`/organiser/${id}`);
        toast({
          title: "Organiser deleted!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => fetchOrganiser(), 300);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //add each component to box and add flex or wrap to make it responsive
    <Box width="100%" p="10" overflowX="auto">
      <Text fontSize="4xl"> Organiser List</Text>
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
          value={selectedSort}
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
          <ModalHeader>Create organiser</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={inputName}
                placeholder="Name"
                onChange={(e) => setInputName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={inputEmail}
                placeholder="Email"
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Club</FormLabel>
              <Select
                variant="outline"
                placeholder="--select an option--"
                width="50%"
                value={inputClub}
                onChange={(e) => setInputClub(e.target.value)}
              >
                <option value="option1">MUMEC</option>
                <option value="option2">MUMTEC</option>
                <option value="option3">Monash Staff</option>
              </Select>
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
            <Button
              onClick={(e) => {
                e.preventDefault();
                addOrganiser(e);
                onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
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
          {organisers
            .filter((organiser: any) => {
              return searchTerm.toLowerCase() === ""
                ? organiser
                : organiser.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
            .map((organiser: any) => (
              <Tr>
                <Td>{organiser.stu_name}</Td>
                <Td>{organiser.stu_email}</Td>
                <Td>{organiser.organiser_name}</Td>
                <Td>
                  <HStack spacing={3}>
                    <IconButton
                      colorScheme="blue"
                      variant="outline"
                      aria-label="Edit Organiser"
                      icon={<MdOutlineModeEdit />}
                    ></IconButton>
                    <IconButton
                      onClick={() => {
                        deleteOrganiser(organiser.organiser_uuid);
                      }}
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
