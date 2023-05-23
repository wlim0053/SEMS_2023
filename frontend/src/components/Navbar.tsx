import React from "react";
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
import OrganiserList from "../pages/Admin/OrganiserList";
import ActivityLog from "../pages/Admin/ActivityLog";
import Admin from "../pages/Admin/AdminDashboard";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const buttonRef = React.useRef(null)


  return (
    <>
      {/* Change the gap between hamburger icon and the logo */}
      <Flex bg="#006DAE" h="60px" alignItems='center' gap='10'>
        <Box>
          <HamburgerIcon ref={buttonRef}
            onClick={onOpen}
            boxSize='1.5em'
            color='#FFFFFF'
            css={{
              margin: '20px',
              cursor: 'pointer'
            }} />
        </Box>
        {/* <Spacer/> */}
        <Image src='../public/monash_logo.png' height='50px'></Image>
        <Spacer />
        <Menu>
          {/* To do: change the sign in sign up to an icon */}
          <MenuButton ml={4} mr={4} as={Button} variant="ghost">
            Sign In / Sign Up
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/signin">Sign In</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/signup">Sign Up</Link>
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
              <Link to="/Admin">Home</Link>
              <Link to="/OrganiserList">Organiser List</Link>
              <Link to="/ActivityLog">Activity Log</Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Menu>
              <MenuButton as={Button} variant="outline">
                View
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/Admin">
                  Admin View
                </MenuItem>
                <MenuItem as={Link} to="/organiser">
                  Organiser View
                </MenuItem>
                <MenuItem as={Link} to="/student">
                  Student View
                </MenuItem>
              </MenuList>
            </Menu>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Routes>
        <Route path="/" element={<Navigate to="/Admin" replace />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/OrganiserList" element={<OrganiserList />} />
        <Route path="/ActivityLog" element={<ActivityLog />} />
      </Routes>
    </>
  );
};

export default Navbar;
