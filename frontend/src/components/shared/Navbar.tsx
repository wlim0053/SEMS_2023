import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Route, Routes } from "react-router-dom";
import OrganiserList from "../../pages/admin/OrganiserList";
import ActivityLog from "../../pages/admin/ActivityLog";
import Admin from "../../pages/admin/AdminDashboard";
import StudentHome from "../../pages/student/StudentHome";
import EventHome from "../../pages/student/EventHome";
import OrganiserMainPage from "../../pages/Organiser/OrganiserMainPage";
import CreateEventForm from "../../pages/Organiser/CreateEventForm";
import CreateEventForm2 from "../../pages/Organiser/CreateEventForm2";
import CreateEventForm3 from "../../pages/Organiser/CreateEventForm3";
import CreateEventForm4a from "../../pages/Organiser/CreateEventForm4a";
import CreateEventForm4b from "../../pages/Organiser/CreateEventForm4b";
import CreateEventForm5a from "../../pages/Organiser/CreateEventForm5a";
import CreateEventForm5b from "../../pages/Organiser/CreateEventForm5b";
import CreateEventForm6 from "../../pages/Organiser/CreateEventForm6";
import CreateEventForm7 from "../../pages/Organiser/CreateEventForm7";
import CreateEventForm8 from "../../pages/Organiser/CreateEventForm8";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex bg="#006DAE" h="60px" alignItems="center" justify="end">
        <Box>
          <HamburgerIcon
            onClick={onOpen}
            boxSize="1.5em"
            color="#FFFFFF"
            css={{
              margin: "20px",
              cursor: "pointer",
            }}
          />
        </Box>
        <Image src="../monash_logo.png" height="50px" />
        <Spacer />
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        colorScheme="blackAlpha"
      >
        <DrawerOverlay></DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Link to="/Admin">Home</Link>
              <Link to="/OrganiserList">Organiser List</Link>
              <Link to="/ActivityLog">Activity Log</Link>
              <Link to="/StudentHome">Student Home</Link>
              <Link to="/EventHome">Event Home</Link>
              <Link to="/OrganiserMainPage">Organiser Main Page</Link>
              <Link to="/CreateEventForm">Create Event</Link>
              <Link to="/CreateEventForm2">Create Event 2</Link>
              <Link to="/CreateEventForm3">Create Event 3</Link>
              <Link to="/CreateEventForm4a">Create Event 4a</Link>
              <Link to="/CreateEventForm4b">Create Event 4b</Link>
              <Link to="/CreateEventForm5a">Create Event 5a</Link>
              <Link to="/CreateEventForm5b">Create Event 5b</Link>
              <Link to="/CreateEventForm6">Create Event 6</Link>
              <Link to="/CreateEventForm7">Create Event 7</Link>
              <Link to="/CreateEventForm8">Create Event 8</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/OrganiserMainPage" element={<OrganiserMainPage />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/OrganiserList" element={<OrganiserList />} />
        <Route path="/ActivityLog" element={<ActivityLog />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/EventHome" element={<EventHome />} />
        <Route path="/CreateEventForm" element={<CreateEventForm />} />
        <Route path="/CreateEventForm2" element={<CreateEventForm2 />} />
        <Route path="/CreateEventForm3" element={<CreateEventForm3 />} />
        <Route path="/CreateEventForm4a" element={<CreateEventForm4a />} />
        <Route path="/CreateEventForm4b" element={<CreateEventForm4b />} />
        <Route path="/CreateEventForm5a" element={<CreateEventForm5a />} />
        <Route path="/CreateEventForm5b" element={<CreateEventForm5b />} />
        <Route path="/CreateEventForm6" element={<CreateEventForm6 />} />
        <Route path="/CreateEventForm7" element={<CreateEventForm7 />} />
        <Route path="/CreateEventForm8" element={<CreateEventForm8 />} />
      </Routes>

    </>
  );
};

export default Navbar;
