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
  background,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Route, Routes,  Navigate } from "react-router-dom";
import OrganiserList from "../pages/OrganiserList";
import ActivityLog from "../pages/ActivityLog";
import Admin from "../pages/Admin";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const buttonRef = React.useRef(null)


  return (
    <>
      <Box bg="blue.700" h="60px" display="flex" justifyContent="space-between" alignItems="center">
          {/* <Button ref={buttonRef} onClick={onOpen} variant='ghost' _hover={{}}> */}
          <HamburgerIcon ref={buttonRef} 
          onClick={onOpen}
          boxSize='1.5em'
          css={{
            margin: '20px',
            cursor: 'pointer'
          }}/> 
           <Menu>
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
      </Box>

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
            <DrawerCloseButton/>
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={4}>
                <Link to="/Admin">Home</Link>
                <Link to="/OrganiserList">Organiser List</Link>
                <Link to="/ActivityLog">Activity Log</Link>
              </VStack>
            </DrawerBody>
            <DrawerFooter>Hello3</DrawerFooter>
          </DrawerContent>
        </Drawer>

      <Routes>
        <Route path="/"element={<Navigate to="/Admin" replace/>}/>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/OrganiserList" element={<OrganiserList />} />
        <Route path="/ActivityLog" element={<ActivityLog />} />
      </Routes>
    </>
  );
};

export default Navbar;
