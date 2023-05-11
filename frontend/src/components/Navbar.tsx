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
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Route, Routes } from "react-router-dom";

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
        <Image src='/monash_logo.png' height='50px'></Image>
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
              <Link to="/StudentHome">Student Home</Link>
              <Link to="/EventHome">Event Home</Link>
            </VStack>
          </DrawerBody>
          <DrawerFooter>Hello3</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;