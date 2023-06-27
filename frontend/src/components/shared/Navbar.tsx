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
import OrganiserList from "../../pages/Admin/OrganiserList";
import ActivityLog from "../../pages/Admin/ActivityLog";
import Admin from "../../pages/Admin/AdminDashboard";
import StudentHome from "../../pages/student/StudentHome";
import EventHome from "../../pages/student/EventHome";
import OrganiserMainPage from "../../pages/Organiser/OrganiserMainPage";
import CreateEventForm from "../../pages/Organiser/CreateEventForm";
import EventDetailsDashboard from "../../pages/Organiser/EventDetailsDashboard";
import LoginPage from "../LoginPage"
import RegisterPage from "../RegisterPage"

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
							<Link to="/LoginPage">Login Page</Link>
              <Link to="/OrganiserMainPage">Organiser Main Page</Link>
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
				<Route path="/LoginPage" element={<LoginPage />} />
				<Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/CreateEventForm" element={<CreateEventForm />} />
        <Route path="/EventDetailsDashboard" element={<EventDetailsDashboard date="2023-05-21" time="14:00" capacity={100} venue="Example Venue" recurring={false} eventStatistics={{ gender: { male: 50, female: 50 }, specialization: { engineering: 30, medicine: 40, arts: 30 } }} />} />
      </Routes>

    </>
  );
};

export default Navbar;
