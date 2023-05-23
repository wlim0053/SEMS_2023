import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
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
  Text,
  background,
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import OrganiserList from "../../pages/Admin/OrganiserList";
import ActivityLog from "../../pages/Admin/ActivityLog";
import Admin from "../../pages/Admin/AdminDashboard";
import LoginPage from "../LoginPage";
import Testlandingpage from "../Testlandingpage";
import AttendanceHome from "../../pages/student/AttendanceHome";
import AttendancePage from "../AttendancePage";
import EventHome from "../../pages/student/EventHome";
import StudentHome from "../../pages/student/StudentHome";
import Historypage from "../Histotypage";
import FeedbackForm from "../FeedbackForm";
import OrganiserMainPage from "../../pages/Organiser/OrganiserMainPage";
import EventDetailsDashboard from "../../pages/Organiser/EventDetailsDashboard";
import Page1 from "../../pages/Organiser/CreateEventForm";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const buttonRef = React.useRef(null);
  const [view, setView] = useState("student");

  const handleViewChange = (selectedView) => {
    setView(selectedView);
    onClose();

  };
  return (
    <>
      {/* Change the gap between hamburger icon and the logo */}
      <Flex bg="#006DAE" h="60px" alignItems='center' gap='10'>
        <Box>
          <HamburgerIcon
            ref={buttonRef}
            onClick={onOpen}
            boxSize='1.5em'
            color='#FFFFFF'
            css={{
              margin: '20px',
              cursor: 'pointer'
            }} />
        </Box>
        {/* <Spacer/> */}
        <Image src='/monash_logo.png' height='50px'></Image>
        <Spacer />
        <Menu>
          {/* To do: change the sign in sign up to an icon */}
          <MenuButton ml={4} mr={4} as={Button} variant="ghost">
            Login
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/Login">Login</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>


      {/* </Button> */}
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={buttonRef}
        colorScheme="blackAlpha"
      >
        <DrawerOverlay ></DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Link to="/Testlandingpage">Home</Link>
              <Link to="/StudentHome">Student Home</Link>
              <Link to='/AttendanceHome'>Attendance Home</Link>
              <Link to="/Historypage">History Page</Link>
              <Link to="/FeedbackForm">Feedback Form</Link>
              {(view === "organiser" || view === "admin") && (
                <>
              <Link to="/OrganiserMainPage">Organiser Home</Link>
              <Link to="/Event">View Event Details</Link>
              <Link to="page1">Event Form</Link>
                </>
              )}
              {view === "admin" && (
                <>
                  <Link to="/Admin">Admin Dashboard</Link>
                  <Link to="/OrganiserList">Organiser List</Link>
                  <Link to="/ActivityLog">Activity Log</Link>
                </>
              )}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Menu>
              <MenuButton as={Button} variant="outline">
                View
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => handleViewChange("student")}
                  disabled={view === "student"}
                >
                  Student View
                </MenuItem>
                <MenuItem
                  onClick={() => handleViewChange("organiser")}
                  disabled={view === "organiser"}
                >
                  Organiser View
                </MenuItem>
                <MenuItem
                  onClick={() => handleViewChange("admin")}
                  disabled={view === "admin"}
                >
                  Admin View
                </MenuItem>
              </MenuList>
            </Menu>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Routes>
        <Route path="/" element={<Navigate to="/Testlandingpage" replace />} />
        <Route path="/Testlandingpage" element={<Testlandingpage />} />
        <Route path="/AttendanceHome" element={<AttendancePage />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/Historypage" element={<Historypage />} />
        <Route path="/EventHome" element={<EventHome />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />} />
        {(view === "organiser" || view === "admin") && (
          <>
            <Route path="/OrganiserMainPage" element={<OrganiserMainPage />} />
            <Route path="/Event" element={<EventDetailsDashboard name={""} description={""} date={""} time={""} capacity={0} venue={""} recurring={false} eventStatistics={{
              gender: {
                male: 0,
                female: 0
              },
              specialization: {
                engineering: 0,
                medicine: 0,
                arts: 0
              }
            }} />} />
            <Route path="/page1" element={<Page1 />} />
          </>
          )}             
        {view === "admin" && (
          <>
            <Route path="/Admin" element={<Admin />} />
            <Route path="/OrganiserList" element={<OrganiserList />} />
            <Route path="/ActivityLog" element={<ActivityLog />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Navbar;