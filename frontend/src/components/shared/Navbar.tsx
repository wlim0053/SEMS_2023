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
import theme from "../../utils/theme";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const buttonRef = React.useRef(null);
  const [view, setView] = useState("student");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Navigate to the appropriate landing page based on the selected view
    switch (view) {
      case "student":
        navigate("/TestLandingPage");
        break;
      case "organiser":
        navigate("/OrganiserMainPage");
        break;
      case "admin":
        navigate("/Admin");
        break;
      default:
        break;
    }
  }, [view]);

  const handleViewChange = (selectedView) => {
    setView(selectedView);
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
        <Box ml="auto" mr="20px">
        <IconButton
          icon={<Icon as={FiUser} boxSize={6} />}
          aria-label="Login"
          variant="ghost"
          color='white'
          onClick={() => navigate("/login")}
        />
        </Box>
        <IconButton
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            aria-label="Toggle Dark Mode"
            variant="ghost"
            color="white"
            onClick={toggleColorMode}
          />
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
            {view === "student" && (
              <>
                <Link to="/TestLandingPage" onClick={() => handleViewChange("student")}>
                Home
                </Link>
                <Link to="/StudentHome" onClick={() => handleViewChange("student")}>
                Student Home
                </Link>
                <Link to="/AttendanceHome" onClick={() => handleViewChange("student")}>
                Attendance Home
                </Link>
                <Link to="/HistoryPage" onClick={() => handleViewChange("student")}>
                History Page
                </Link>
                <Link to="/FeedbackForm" onClick={() => handleViewChange("student")}>
                Feedback Form
                </Link>
              </>
              )}
            {view === "organiser" && (
              <>
                <Link to="/OrganiserMainPage" onClick={() => handleViewChange("organiser")}>
                Organiser Home
                </Link>
                <Link to="/Event" onClick={() => handleViewChange("organiser")}>
                View Event Details
                </Link>
                <Link to="/page1" onClick={() => handleViewChange("organiser")}>
                Event Form
                </Link>
              </>
            )}
            {view === "admin" && (
              <>
                <Link to="/Admin" onClick={() => handleViewChange("admin")}>
                Admin Dashboard
                </Link>
                <Link to="/OrganiserList" onClick={() => handleViewChange("admin")}>
                Organiser List
                </Link>
                <Link to="/ActivityLog" onClick={() => handleViewChange("admin")}>
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
      <Route path="/" element={<Outlet />} />
    
          <Route path="/" element={<Navigate to="/TestLandingPage" replace />} />
          <Route path="/TestLandingPage" element={<Testlandingpage />} />
          <Route path="/AttendanceHome" element={<AttendancePage />} />
          <Route path="/StudentHome" element={<StudentHome />} />
          <Route path="/HistoryPage" element={<Historypage />} />
          <Route path="/EventHome" element={<EventHome />} />
          <Route path="/FeedbackForm" element={<FeedbackForm />} />
   
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
          
         
          <Route path="/Admin" element={<Admin />} />
          <Route path="/OrganiserList" element={<OrganiserList />} />
          <Route path="/ActivityLog" element={<ActivityLog />} />
      </Routes>
    </>
    </ChakraProvider>
  );
};

export default Navbar;