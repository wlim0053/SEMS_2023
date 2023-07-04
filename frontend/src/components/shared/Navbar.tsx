import React,{useEffect, useState} from "react";
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
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Route, Routes, Navigate, useNavigate, Outlet } from "react-router-dom";
import OrganiserList from "../../pages/Admin/OrganiserList";
import Admin from "../../pages/Admin/AdminDashboard";
import StudentHome from "../../pages/student/StudentHome";
import EventHome from "../../pages/student/EventHome";
import LoginPage from "../../pages/student/LoginPage";
import RegisterPage from "../../pages/student/RegisterPage";
import HistoryPage from "../../pages/student/HistoryPage";
import OrganiserMainPage from "../../pages/Organiser/OrganiserMainPage";
import CreateEventPage from "../../pages/Organiser/CreateEventPage";
import EditEventPage from "../../pages/Organiser/EditEventPage";
import EventDetailsDashboard from "../../pages/Organiser/EventDetailsDashboard";
import EventApproval from "../../pages/Admin/EventApproval";
import NewHistoryPage from "../../pages/student/HistoryPage";
import NewLandingPage from "../../pages/student/NewLandingPage";
// import AttendanceHome from "../../pages/student/AttendanceHome";
import FeedbackPage from "../../pages/student/FeedbackPage";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = React.useRef(null);
  const [accessLevel, setAccessLevel] = useState("S"); // Track the user's access level
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the appropriate landing page based on the selected view
    switch (accessLevel) {
      case "S":
        navigate("/NewLandingPage");
        break;
      case "O":
        navigate("/OrganiserMainPage");
        break;
      case "A":
        navigate("/Admin");
        break;
      default:
        break;
    }
  }, [accessLevel]);

  const handleViewChange = (selectedView) => {
    setAccessLevel(selectedView); // Update the user's access level
  };


  return (
    <>
      {/* Change the gap between hamburger icon and the logo */}
      <Flex bg="#006DAE" h="60px" alignItems="center" gap="10">
        <Box>
          <HamburgerIcon
            ref={buttonRef}
            onClick={onOpen}
            boxSize="1.5em"
            color="#FFFFFF"
            css={{
              margin: "20px",
              cursor: "pointer",
            }} />
        </Box>
        {/* <Spacer/> */}
        <Image src="../monash_logo.png" height="50px"></Image>

        {/*<Menu>*/}
        {/*  /!* To do: change the sign in sign up to an icon *!/*/}
        {/*  <MenuButton ml={4} mr={4} as={Button} variant="ghost">*/}
        {/*    Sign In / Sign Up*/}
        {/*  </MenuButton>*/}
        {/*  <MenuList>*/}
        {/*    <MenuItem>*/}
        {/*      <Link to="/signin">Sign In</Link>*/}
        {/*    </MenuItem>*/}
        {/*    <MenuItem>*/}
        {/*      <Link to="/signup">Sign Up</Link>*/}
        {/*    </MenuItem>*/}
        {/*  </MenuList>*/}
        {/*</Menu>*/}
      </Flex>

      {/* </Button> */}
      <Drawer
      isOpen ={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={buttonRef}
      colorScheme="blackAlpha"
      >
      <DrawerOverlay></DrawerOverlay>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          <VStack align="start" spacing={4}>
            {accessLevel === "S" && (
              <>
                <Link to="/NewLandingPage" onClick={() => handleViewChange("S")}>Home</Link>
                <Link to="/StudentHome" onClick={() => handleViewChange("S")}>Student Home</Link>
                <Link to="/EventHome" onClick={() => handleViewChange("S")}>Event Home</Link>
                <Link to="/AttendanceHome" onClick={() => handleViewChange("S")}>Attendance Home</Link>
                <Link to="/NewHistoryPage" onClick={() => handleViewChange("S")}>History Page</Link>
                <Link to="/FeedbackPage" onClick={() => handleViewChange("S")}>Feedback Page</Link>
                <Link to="/LoginPage" onClick={() => handleViewChange("S")}>Login Page</Link>
              </>
            )}
            {accessLevel === "O" && (
              <>
                <Link to="/OrganiserMainPage" onClick={() => handleViewChange("O")}>Home</Link>
                <Link to="/CreateEventPage" onClick={() => handleViewChange("O")}>Create Event</Link>
                <Link to="EditEventPage" onClick={() => handleViewChange("O")}>Edit Event</Link>
                <Link to="/EventDetailsDashboard" onClick={() => handleViewChange("O")}>Event Details</Link>
              </>
            )}
            {accessLevel === "A" && (
              <>
                <Link to="/Admin" onClick={() => handleViewChange("A")}>AdminDashboard</Link>
                <Link to="/OrganiserList" onClick={() => handleViewChange("A")}>Organiser List</Link>
                <Link to="/EventApproval" onClick={() => handleViewChange("A")}>Event Approval</Link>
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
                onClick={() => handleViewChange("S")}
                disabled={accessLevel === "S"}
              >
                Student View
              </MenuItem>
              <MenuItem
                onClick={() => handleViewChange("O")}
                disabled={accessLevel === "O"}
              >
                Organiser View
              </MenuItem>
              <MenuItem
                onClick={() => handleViewChange("A")}
                disabled={accessLevel === "A"}
              >
                Admin View
              </MenuItem>
            </MenuList>
          </Menu>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

    <Routes>
          {/* Render links and routes based on the user's access level */}
          {accessLevel === "S" && (
            <>
        <Route path="/" element={<Navigate to="/NewLandingPage" replace />} />
        <Route path="/NewLandingPage" element={<NewLandingPage />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/EventHome" element={<EventHome />} />
        {/* <Route path="/AttendanceHome" element={<AttendanceHome />} /> */}
        <Route path="/NewHistoryPage" element={<NewHistoryPage />} />
        <Route path="/FeedbackPage" element={<FeedbackPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        </>
          )}
          {accessLevel === "O" && (
            <>
              {/* Organiser view */}
        <Route path="/OrganiserMainPage" element={<OrganiserMainPage />} />
        <Route path="/CreateEventPage" element={<CreateEventPage />} />
        <Route path="/EditEventPage" element={<RegisterPage />} />
        <Route path="/EventDetailsDashboard" element={<EventDetailsDashboard />} />
        </>
          )}
          {accessLevel === "A" && (
            <>
              {/* Admin view */}
        <Route path="/Admin" element={<Admin />} />
        <Route path="/OrganiserList" element={<OrganiserList />} />
        <Route path="/EventApproval" element={<EventApproval />} />
       </>
          )}
      </Routes>
    </>
  );
};

export default Navbar;
