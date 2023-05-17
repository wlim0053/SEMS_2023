import React from "react"
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
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Link, Route, Routes } from "react-router-dom"
import OrganiserList from "../../pages/admin/OrganiserList"
import ActivityLog from "../../pages/admin/ActivityLog"
import Admin from "../../pages/admin/AdminDashboard"
import StudentHome from "../../pages/student/StudentHome"
import EventHome from "../../pages/student/EventHome"

const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const buttonRef = React.useRef(null)

	return (
		<>
			{/* Change the gap between hamburger icon and the logo */}
			<Flex
				bg="#006DAE"
				h="60px"
				alignItems="center"
				gap="10"
				justify="end"
			>
				<Box>
					<HamburgerIcon
						ref={buttonRef}
						onClick={onOpen}
						boxSize="1.5em"
						color="#FFFFFF"
						css={{
							margin: "20px",
							cursor: "pointer",
						}}
					/>
				</Box>
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

			<Routes>
				<Route path="/" element="" />
				<Route path="/Admin" element={<Admin />} />
				<Route path="/OrganiserList" element={<OrganiserList />} />
				<Route path="/ActivityLog" element={<ActivityLog />} />
				<Route path="/StudentHome" element={<StudentHome />} />
				<Route path="/EventHome" element={<EventHome />} />
			</Routes>
		</>
	)
}

export default Navbar
