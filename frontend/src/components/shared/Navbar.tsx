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
import CreateEventForm9 from "../../pages/Organiser/CreateEventForm9";
import EventDetailsDashboard from "../../pages/Organiser/EventDetailsDashboard";

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
        <Route path="/CreateEventForm9" element={<CreateEventForm9 />} />
        <Route path="/EventDetailsDashboard" element={<EventDetailsDashboard date="2023-05-21" time="14:00" capacity={100} venue="Example Venue" recurring={false} eventStatistics={{ gender: { male: 50, female: 50 }, specialization: { engineering: 30, medicine: 40, arts: 30 } }} />} />
      </Routes>

    </>
  );
};

export default Navbar;
