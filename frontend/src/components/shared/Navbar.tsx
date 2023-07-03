import React, { useState, useEffect } from "react";
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
  IconButton,
  Icon,
  useColorMode,
  ChakraProvider
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { HamburgerIcon, SunIcon, MoonIcon  } from "@chakra-ui/icons";
import { Link, Route, Routes, Navigate, useNavigate, useLocation, Outlet } from "react-router-dom";
import OrganiserList from "../../pages/Admin/OrganiserList";
import ActivityLog from "../../pages/Admin/ActivityLog";
import Admin from "../../pages/Admin/AdminDashboard";
import LoginPage from "../../pages/shared/LoginPage";
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
import theme from "../../utils/theme";
import RegisterPage from "../../pages/shared/RegisterPage";

const Navbar = ({user_access_lvl}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const buttonRef = React.useRef(null);
  const [accessLevel, setAccessLevel] = useState(user_access_lvl); // Track the user's access level
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Navigate to the appropriate landing page based on the selected view
    switch (accessLevel) {
      case "S":
        navigate("/TestLandingPage");
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
  }, [accessLevel, navigate]);

  const handleViewChange = (selectedView) => {
    setAccessLevel(selectedView); // Update the user's access level
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ChakraProvider theme={theme}>
    <>
      {/* Change the gap between hamburger icon and the logo */}
      <Flex bg="blue" h="60px" alignItems='center' gap='10'>
        <Box>
          <HamburgerIcon
            ref={buttonRef}
            onClick={onOpen}
            boxSize='1.5em'
            color='white'
            css={{
              margin: '20px',
              cursor: 'pointer'
            }} />
        </Box>
        <Box>
          <Image src='/monash_logo.png' height='50px'></Image>
        </Box>
        {/* <Box ml="auto" mr="20px">
        <IconButton
          icon={<Icon as={FiUser} boxSize={6} />}
          aria-label="Login"
          variant="ghost"
          color='white'
          onClick={() => navigate("/LoginPage")}
        />
        </Box> */}
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
            {accessLevel === "S" && (
              <>
                <Link to="/TestLandingPage" onClick={() => handleViewChange("s")}>
                Home
                </Link>
                <Link to="/StudentHome" onClick={() => handleViewChange("S")}>
                Student Home
                </Link>
                <Link to="/AttendanceHome" onClick={() => handleViewChange("S")}>
                Attendance Home
                </Link>
                <Link to="/HistoryPage" onClick={() => handleViewChange("S")}>
                History Page
                </Link>
                <Link to="/FeedbackForm" onClick={() => handleViewChange("S")}>
                Feedback Form
                </Link>
              </>
              )}
            {accessLevel === "O" && (
              <>
                <Link to="/OrganiserMainPage" onClick={() => handleViewChange("O")}>
                Organiser Home
                </Link>
                <Link to="/Event" onClick={() => handleViewChange("O")}>
                View Event Details
                </Link>
                <Link to="/page1" onClick={() => handleViewChange("O")}>
                Event Form
                </Link>
              </>
            )}
            {accessLevel === "A" && (
              <>
                <Link to="/Admin" onClick={() => handleViewChange("A")}>
                Admin Dashboard
                </Link>
                <Link to="/OrganiserList" onClick={() => handleViewChange("A")}>
                Organiser List
                </Link>
                <Link to="/ActivityLog" onClick={() => handleViewChange("A")}>
                Activity Log
                </Link>
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
        <Route path="/" element={<Outlet />} />
          {/* Render links and routes based on the user's access level */}
          {accessLevel === "S" && (
            <>
          <Route path="/" element={<Navigate to="/TestLandingPage" replace />} />
          <Route path="/TestLandingPage" element={<Testlandingpage />} />
          <Route path="/AttendanceHome" element={<AttendancePage />} />
          <Route path="/StudentHome" element={<StudentHome />} />
          <Route path="/HistoryPage" element={<Historypage />} />
          <Route path="/EventHome" element={<EventHome />} />
          <Route path="/FeedbackForm" element={<FeedbackForm />} />
          </>
          )}
          {accessLevel === "O" && (
            <>
              {/* Organiser view */}
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

          {accessLevel === "A" && (
            <>
              {/* Admin view */}
          <Route path="/Admin" element={<Admin />} />
          <Route path="/OrganiserList" element={<OrganiserList />} />
          <Route path="/ActivityLog" element={<ActivityLog />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          </>
          )}
      </Routes>
    </>
    </ChakraProvider>
  );
};

export default Navbar;