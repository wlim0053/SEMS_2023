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
import monashLogo from '../components/monash_logo.png';


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
        <Image src={monashLogo} height='50px' />
        <Spacer />
        <Menu>
          {/* To do: change the sign in sign up to an icon */}
          <MenuButton ml={4} mr={4} as={Button} variant="ghost">
            Sign In / Sign Up
          </MenuButton>
          <MenuList>
            <MenuItem>
              
            </MenuItem>
            <MenuItem>
              
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
            </VStack>
          </DrawerBody>
          <DrawerFooter>Hello3</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;