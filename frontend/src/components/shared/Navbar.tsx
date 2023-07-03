import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
<<<<<<< HEAD
=======
  DrawerFooter,
>>>>>>> 274c32a3e49aa1b2bcf450e2033f8680a3797b3c
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
<<<<<<< HEAD
import OrganiserMainPage from "../../pages/Organiser/OrganiserMainPage";
import CreateEventPage from "../../pages/Organiser/CreateEventPage";
import EditEventPage from "../../pages/Organiser/EditEventPage";
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
=======
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import NewHistoryPage from "../NewHistoryPage";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = React.useRef(null);

  return (
    <>
      {/* Change the gap between hamburger icon and the logo */}
      <Flex bg="#006DAE" h="60px" alignItems="center" gap="10" justify="end">
        <Box>
          <HamburgerIcon
            ref={buttonRef}
>>>>>>> 274c32a3e49aa1b2bcf450e2033f8680a3797b3c
            onClick={onOpen}
            boxSize="1.5em"
            color="#FFFFFF"
            css={{
              margin: "20px",
              cursor: "pointer",
            }}
          />
        </Box>
<<<<<<< HEAD
        <Image src="../monash_logo.png" height="50px" />
        <Spacer />
      </Flex>

=======
        {/* <Spacer/> */}
        <Image src="../monash_logo.png" height="50px"></Image>
        <Spacer />
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
>>>>>>> 274c32a3e49aa1b2bcf450e2033f8680a3797b3c
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
<<<<<<< HEAD
=======
        finalFocusRef={buttonRef}
>>>>>>> 274c32a3e49aa1b2bcf450e2033f8680a3797b3c
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
<<<<<<< HEAD
							<Link to="/LoginPage">Login Page</Link>
              <Link to="/OrganiserMainPage">Organiser Main Page</Link>
            </VStack>
          </DrawerBody>
=======
              <Link to="/LoginPage">Login Page</Link>
              <Link to="/HistoryPage">History Page</Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter>Hello3</DrawerFooter>
>>>>>>> 274c32a3e49aa1b2bcf450e2033f8680a3797b3c
        </DrawerContent>
      </Drawer>

      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Admin />} />
        <Route path="/OrganiserMainPage" element={<OrganiserMainPage />} />
=======
        <Route path="/" element="" />
>>>>>>> 274c32a3e49aa1b2bcf450e2033f8680a3797b3c
        <Route path="/Admin" element={<Admin />} />
        <Route path="/OrganiserList" element={<OrganiserList />} />
        <Route path="/ActivityLog" element={<ActivityLog />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/EventHome" element={<EventHome />} />
<<<<<<< HEAD
				<Route path="/LoginPage" element={<LoginPage />} />
				<Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/CreateEventPage" element={<CreateEventPage />} />
        <Route path="/EditEventPage" element={<EditEventPage />} />
        <Route path="/EventDetailsDashboard" element={<EventDetailsDashboard />} />
      </Routes>

    </>
  );
};

=======
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/HistoryPage" element={<NewHistoryPage />} />
      </Routes>
    </>
  );
};

>>>>>>> 274c32a3e49aa1b2bcf450e2033f8680a3797b3c
export default Navbar;
