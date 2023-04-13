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
  background,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = React.useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <Box bg="blue.700">
        {/* <Button ref={buttonRef} onClick={onOpen} variant='ghost' _hover={{}}> */}
        <HamburgerIcon
          ref={buttonRef}
          onClick={onOpen}
          boxSize="1.5em"
          css={{
            margin: "10px",
            cursor: "pointer",
          }}
        />
        {/* </Button> */}
        <Drawer
          isOpen={isOpen}
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
              {["Home", "Organiser List", "Activity Log"].map((nav) => (
                <Box>{nav}</Box>
              ))}
              <button onClick={() => navigate("/StudentHome")}>Student Home</button>
            </DrawerBody>
            <DrawerFooter>Hello3</DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
