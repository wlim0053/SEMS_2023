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

const OrganiserList = () => {
  const headers = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
    { key: "club", value: "Club" },
    { key: "actions", value: "Actions", disableSorting: true },
  ];

  type sortField = "Name" | "Club";

  const [organisers, setOrganiser] = useState([]);
  const [organiserID, setOrganiserID] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedSort, setSelectedSort] = useState<sortField>("Name");

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputClub, setInputClub] = useState("");

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editClub, setEditClub] = useState("");
  const [editClubFlag, setEditClubFlag] = useState(false);

  const [parentClub, setParentClub] = useState(new Map()); //parent club list
  const [parentClubSelection, setParentClubSelection] = useState<
    Object[] | null
  >(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const history = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  //TODO: handle sorting

  const handleEdit = (id: any) => {
    onOpenEdit();
  };

  //json body for adding organiser
  const bodyAdmin = {
    organiser_name: inputName,
    parent_uuid: inputClub === "" ? null : inputClub,
    user_email: inputEmail,
  };
  //get organiser from api
  const fetchOrganiser = async () => {
    try {
      const response = await api.get("/organiser");
      setOrganiser(response.data);
      extractParentClub();
      handleSort(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //run fetchOrganiser when the page loads
  useEffect(() => {
    fetchOrganiser();
  }, []);

  //function to extract the clubs with parent uuid = null
  const extractParentClub = async () => {
    try {
      const response = await api.get("/organiser?parent_uuid=null");
      setParentClubSelection(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //add organiser to database using post
  /* we need to manually add the admins into the db, can assume admin is in organiser list already */

  //MUSA can be parent club with parent_uuid = null, but not admin
  //not every parent is admin, admin is a parent club
  const addOrganiser = async (e: any) => {
    e.preventDefault();
    if (inputClub === "null" || inputClub === "") {
      bodyAdmin.parent_uuid = null;
    }
    try {
      const response = await api.post("/organiser", bodyAdmin);
      setTimeout(() => fetchOrganiser(), 200);
      toast({
        title: "Organiser added successfully!",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      setInputName("");
      setInputEmail("");
      setInputClub("");
    } catch (error) {
      validateForm(error);
      console.log(error);
      setInputName("");
      setInputEmail("");
      setInputClub("");
    }
  };

  //function to get organiser by organiser uuid
  const getOrganiserById = async (id: any) => {
    try {
      const response = await api.get(`/organiser/${id}`);
      setEditName(response.data[0].organiser_name);
      setEditEmail(response.data[0].user_email);
      if (response.data[0].parent_uuid === null) {
        setEditClub("None");
        setEditClubFlag(true);
      } else {
        setEditClub(response.data[0].parent_uuid);
        setEditClubFlag(false);
      }
      setOrganiserID(id);
    } catch (error) {
      console.log(error);
    }
  };

  //json body for updating organiser
  const bodyUpdate = {
    organiser_name: editName,
    parent_uuid: editClub === "" ? null : editClub,
    user_email: editEmail,
  };

  //update organiser details
  const updateOrganiser = async (id: any) => {
    if (inputClub === "null" || inputClub === "") {
      bodyUpdate.parent_uuid = null;
    }
    try {
      if (organiserID === id) {
        const response = await api.put(`/organiser/${id}`, bodyUpdate);
        setTimeout(() => fetchOrganiser(), 200);
        toast({
          title: "Organiser updated successfully!",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        setEditName("");
        setEditEmail("");
        setEditClub("");
      }
    } catch (error) {
      validateForm(error);
      console.log(error);
    }
  };

  /**organiser that created event cant be deleted.
   * Eg IC and Car, Want to sell car, but the car is tied to your IC.
   * How do u settle the car.*/
  //function to delete organiser by calling api delete
  //TODO: cannot delete parent if parent got child
  const deleteOrganiser = async (id: any) => {
    try {
      // change to alert dialog in chakra (use boolean)
      if (window.confirm("Are you sure you want to delete this organiser?")) {
        await api.delete(`/organiser/${id}`);
        setTimeout(() => fetchOrganiser(), 300);
        toast({
          title: "Organiser deleted successfully!",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Cannot delete organiser that created event!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  //function to return the error message on input validation
  const validateForm = (error) => {
    if (error.response.status === 422) {
      toast({
        title: "Invalid name or email!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else if (error.response.status === 404) {
      toast({
        title: "User email not found!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
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
        {/* <Text px={5}>Sort by: </Text>
        <Select
          variant="outline"
          placeholder="--select an option--"
          width="20%"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value as sortField)}
        >
          <option value="option1">Club</option>
          <option value="option2">Name</option>
        </Select> */}
        <Button
          leftIcon={<AddIcon />}
          colorScheme="telegram"
          ml="auto"
          variant="solid"
          onClick={() => {
            onOpen();
          }}
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
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create organiser</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={inputName}
                placeholder="Name"
                onChange={(e) => setInputName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
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
                /* Assuming that the admin is already in organiser list*/
                <option value="null" key="None">
                  None
                </option>
                {parentClubSelection ? (
                  parentClubSelection.map((club: any) => (
                    <option
                      value={club.organiser_uuid}
                      key={club.organiser_name}
                    >
                      {club.organiser_name}
                    </option>
                  ))
                ) : (
                  <option value="" key="None"></option>
                )}
              </Select>
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Import Organiser (CSV)</FormLabel>
              <Button
                leftIcon={<BiUpload />}
                colorScheme="blue"
                variant="outline"
              >
                Add File
              </Button>
            </FormControl> */}
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
            <Button
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Table variant="striped">
        <Thead bg="#006DAE">
          <Tr>
            {headers.map((header) => (
              <Td key={header.key} color="white">
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
                : organiser.user_fname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            })
            .map((organiser: any) => (
              <Tr>
                <Td>
                  {organiser.user_fname} {organiser.user_lname}
                </Td>
                <Td>{organiser.user_email}</Td>
                <Td>{organiser.organiser_name}</Td>
                <Td>
                  <HStack spacing={3}>
                    <IconButton
                      colorScheme="blue"
                      variant="outline"
                      aria-label="Edit Organiser"
                      onClick={() => {
                        getOrganiserById(organiser.organiser_uuid);
                        onOpenEdit();
                      }}
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
          <Modal
            isOpen={isOpenEdit}
            onClose={onCloseEdit}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit organiser</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={editName}
                    placeholder="Name"
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={editEmail}
                    placeholder="Email"
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Club</FormLabel>
                  <Select
                    variant="outline"
                    placeholder="--select an option--"
                    width="50%"
                    value={editClub}
                    onChange={(e) => setEditClub(e.target.value)}
                    disabled={editClubFlag}
                  >
                    /* Assuming that the admin is already in organiser list*/
                    <option value="null" key="None">
                      None
                    </option>
                    {parentClubSelection ? (
                      parentClubSelection.map((club: any) => (
                        <option
                          value={club.organiser_uuid}
                          key={club.organiser_name}
                        >
                          {club.organiser_name}
                        </option>
                      ))
                    ) : (
                      <option value="" key="None"></option>
                    )}
                  </Select>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    updateOrganiser(organiserID);
                    onCloseEdit();
                  }}
                  colorScheme="blue"
                  mr={3}
                >
                  Update
                </Button>
                <Button onClick={onCloseEdit}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Tbody>
      </Table>
      <Outlet />
    </Box>
  );
};

export default OrganiserList;
