import React,{useEffect, useState, useContext} from "react";
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

import HistoryPage from "../../pages/student/HistoryPage";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Route, Routes, Navigate, useNavigate, Outlet } from "react-router-dom";
import ACLvlContext, { Aclvl } from "../../components/shared/ACLvlContext";
import OrganiserList from "../../pages/Admin/OrganiserList";
import Admin from "../../pages/Admin/AdminDashboard";
import StudentHome from "../../pages/student/StudentHome";
import EventHome from "../../pages/student/EventHome";
import OrganiserMainPage from "../../pages/Organiser/OrganiserMainPage";
import CreateEventPage from "../../pages/Organiser/CreateEventPage";
import EditEventPage from "../../pages/Organiser/EditEventPage";
import EventDetailsDashboard from "../../pages/Organiser/EventDetailsDashboard";
import EventApproval from "../../pages/Admin/EventApproval";
import NewHistoryPage from "../../pages/student/HistoryPage";
import NewLandingPage from "../../pages/student/NewLandingPage";
import LoginPage from "../../pages/student/LoginPage";
import RegisterPage from "../../pages/student/RegisterPage";
import FeedbackPage from "../../pages/student/FeedbackPage";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = React.useRef(null);
  const {aclvl, setAclvl} = useContext(ACLvlContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the appropriate landing page based on the selected view
    switch (aclvl.user_access_level) {
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
  }, [aclvl.user_access_level]);

  const handleViewChange = (selectedView) => {
    setAclvl(selectedView); // Update the user's access level
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
            {aclvl.user_access_level === "S" && (
              <>
                <Link to="/NewLandingPage" onClick={() => handleViewChange("S")}>Home</Link>
                <Link to="/StudentHome" onClick={() => handleViewChange("S")}>Student Home</Link>
                <Link to="/EventHome" onClick={() => handleViewChange("S")}>Event Home</Link>
                <Link to="/NewHistoryPage" onClick={() => handleViewChange("S")}>History Page</Link>
                <Link to="/LoginPage" onClick={() => handleViewChange("S")}>Login Page</Link>
              </>
            )}
            {aclvl.user_access_level === "O" && (
              <>
                <Link to="/OrganiserMainPage" onClick={() => handleViewChange("O")}>Home</Link>
                <Link to="/CreateEventPage" onClick={() => handleViewChange("O")}>Create Event</Link>
                <Link to="EditEventPage" onClick={() => handleViewChange("O")}>Edit Event</Link>
                <Link to="/EventDetailsDashboard" onClick={() => handleViewChange("O")}>Event Details</Link>
              </>
            )}
            {aclvl.user_access_level === "A" && (
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
                disabled={aclvl.user_access_level === "S"}
              >
                Student View
              </MenuItem>
              <MenuItem
                onClick={() => handleViewChange("O")}
                disabled={aclvl.user_access_level === "O"}
              >
                Organiser View
              </MenuItem>
              <MenuItem
                onClick={() => handleViewChange("A")}
                disabled={aclvl.user_access_level === "A"}
              >
                Admin View
              </MenuItem>
            </MenuList>
          </Menu>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </>
  );
};

export default Navbar;
