import {
  Box,
  Text,
  Heading,
  Flex,
  Spacer,
  List,
  ListItem,
  Button,
  Divider,
  ButtonGroup,
  Image,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Center,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Link,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import Devteam2022 from "./Devteam2022.jpg";

const NewLandingPage = () => {
  return (
    <>
      <Flex
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
        overflow="auto"
      >
        <Box bg="#000" h={["50vh", "92vh"]} w={["100vw", "50%"]}>
          <Image
            src="https://www.easyuni.my/media/institution/photo/2015/09/21/a53749f57df20f401babc429f03e613fead283.jpg.600x400_q85.jpg"
            objectFit="cover"
            h="100%"
            w="100%"
          />
        </Box>

        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="#f6f6f6"
          h={["42vh", "92vh"]}
          w={["100vw", "50%"]}
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            overflow="auto"
          >
          <Heading
            fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
            fontSize={["8vw", "4vw"]}
            textAlign={"center"}
            mb={10}
            color={"black"}
            mx={{ base: "10px", md: "20px" }}
          >
            STUDENT MANAGEMENT EXPERIENCE SYSTEM
          </Heading>
            <ButtonGroup spacing={10} position="relative">
              <Flex>
                <Button
                  variant="solid"
                  color={"white"}
                  minW={{ base: "100px", md: "150px" }}
                  bg="#006dae"
                  _hover={{ bg: "#005c9e" }}
                  leftIcon={<EmailIcon />}
                >
                  Login
                </Button>
              </Flex>

              <Flex>
                <Button
                  variant="solid"
                  color={"white"}
                  minW={{ base: "100px", md: "150px" }}
                  bg="#006dae"
                  _hover={{ bg: "#005c9e" }}
                  leftIcon={<EmailIcon />}
                >
                  Sign Up
                </Button>
              </Flex>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Flex>

      <Flex position="relative" flexWrap="wrap" justifyContent="center">
        <Box
          mx={{ base: "20px", md: "auto" }}
          mb={{ base: "10px", md: "auto" }}
          maxW={{ base: "100%", md: "600px" }}
          width={{ base: "100vh", md: "70vh" }}
          order={{ base: "1", md: "2" }}
          fontFamily={"Helvetica Neue Light, sans-serif"}
        >
          <Heading
            fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
            fontWeight="bold"
            color="black"
            textAlign={{ base: "center", md: "left" }}
            mt={{ base: "50px", md: "100px" }}
          >
            ABOUT THIS PAGE
          </Heading>
          <Text lineHeight="25px" mt="20px">
            This page serves as a starting point for students in School of
            Information Technology and School of Engineering to start on their
            exciting journey to explore and engage with various events and
            activities happening around Monash campus
          </Text>
          <Text lineHeight="25px" mt="20px">
            This page acts as a hub of information, offering students a
            comprehensive overview of upcoming events, including social
            gatherings, workshops, club activities, sports competitions, and
            many more.
          </Text>
          <Text lineHeight="25px" mt="20px">
            Its primary objective is to keep students informed and involved by
            providing details such as event descriptions, dates, times,
            locations, and any registration or ticketing requirements.
          </Text>
          <Text lineHeight="25px" mt="20px">
            This page allows students to easily browse through the wide range of
            options available to them and select events that align with their
            interests, academic pursuits, or personal development goals.
          </Text>
        </Box>

        <Flex
          mx={{ base: "20px", md: "auto" }}
          maxW={{ base: "100%", md: "300px" }}
          width={{ base: "100vh", md: "50vh" }}
          order={{ base: "2", md: "1" }}
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          my={{ base: "20px", md: "80px" }}
        >
          <Box mb="20px" fontFamily={"Helvetica Neue Light, sans-serif"}>
            <Image
              position="relative"
              src={Devteam2022}
              objectFit="contain"
              maxW="100%"
              height="auto"
              mb={2}
            />
            <Center>2022 Development Team</Center>
          </Box>
          <Box>
            <Image
              position="relative"
              src={Devteam2022}
              objectFit="contain"
              maxW="100%"
              height="auto"
              mb={2}
            />
            <Center>2023 Development Team</Center>
          </Box>
        </Flex>
      </Flex>

      <Box bg="#f6f6f6" py={10}>
        <Heading
          fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
          textAlign="center"
          fontWeight="bold"
          fontSize={{ base: "xl", md: "4xl" }} // Adjust font size for mobile and laptop views
        >
          SO WHY JOIN IN ON EVENTS?
        </Heading>
      </Box>
      <Flex
        position="relative"
        bg="#f6f6f6"
        justifyContent="space-around"
        flexWrap="wrap"
        overflow="auto"
        p={2}
        pb={10}
      >
        <Card
          maxW="sm"
          maxH="80vh"
          position="relative"
          mx={{ base: "2px", md: "4px" }}
          mb={{ base: "2px", md: "4px" }}
        >
          <CardBody>
            <Image
              src="https://www.monash.edu.my/__data/assets/image/0010/1034938/blindfutsal4.jpg"
              borderRadius="lg"
              height="220px"
            />
            <Stack mt="6" spacing="3">
              <Heading
                fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
                size="md"
                textAlign={"center"}
              >
                TONS OF EXCITING EVENTS
              </Heading>
              <Text
                fontFamily={"Helvetica Neue Light, sans-serif"}
                textAlign={"center"}
              >
                Join in on various exiciting events to have fun with other
                people, enjoy time in campus and pursue your own passion, which
                can make your overall school experience much more enjoyable and
                fulfilling.
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Spacer />

        <Card
          maxW="sm"
          maxH="80vh"
          position="relative"
          mx={{ base: "2px", md: "4px" }}
          mb={{ base: "15px", md: "30px" }}
        >
          <CardBody>
            <Image
              src="https://www.monash.edu.my/__data/assets/image/0007/912922/home-involved-2020.png"
              borderRadius="lg"
              height="220px"
            />
            <Stack mt="6" spacing="3">
              <Heading
                fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
                size="md"
                textAlign={"center"}
              >
                SOCIALISE
              </Heading> 
              <Text
                fontFamily={"Helvetica Neue Light, sans-serif"}
                textAlign={"center"}
              >
                Get to connect and interact with your peers who may share a
                similar interest as you. Also to form new friendships,
                developing your own social skills as well as creating a sense of
                belonging within the school community.
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Spacer />

        <Card
          maxW="sm"
          maxH="80vh"
          position="relative"
          mx={{ base: "2px", md: "4px" }}
        >
          <CardBody>
            <Image
              src="https://www.monash.edu.my/__data/assets/image/0011/3192581/Monash-Information-Technology-Lab.jpg"
              borderRadius="lg"
              height="220px"
            />
            <Stack mt="6" spacing="3">
              <Heading
                fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
                size="md"
                textAlign={"center"}
              >
                SELF-IMPROVEMENT
              </Heading>
              <Text
                fontFamily={"Helvetica Neue Light, sans-serif"}
                textAlign={"center"}
              >
                Acts as an opportunity for students to further develop and
                enhance a wide range of skills, regardless of the type of
                activities. Students will gte to improve their soft skills such
                as teamwork, leadership,communication, problem-solving, time
                management, and organizational skills.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Flex>

      <Stack direction={{ base: "column", md: "row" }} overflow="auto">
        <Box bg="#006dae" position="relative" alignItems="center" py={8} px={4}>
          <Heading
            fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
            fontWeight="bold"
            fontSize={{ base: "24px", md: "4xl" }}
            color="white"
            textAlign={{ base: "center", md: "left" }}
          >
            SO WHAT CAN YOU DO ON THIS PAGE?
          </Heading>
        </Box>

        <Flex
          width="100%"
          bg="white"
          alignItems="center"
          py={8}
          px={4}
          direction="column"
        >
          <Accordion
            allowMultiple
            width="100%"
            defaultIndex={[0, 1]}
            fontFamily={"Helvetica Neue Light, sans-serif"}
          >
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading
                    fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
                    size="md"
                  >
                    STUDENTS
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={2}>
                  <ListItem fontSize={18}>- Register for events</ListItem>
                  <ListItem fontSize={18}>
                    - View events that they have signed up for, on a personal
                    calendar
                  </ListItem>
                  <ListItem fontSize={18}>
                    - Search for all events organised by different schools and
                    clubs
                  </ListItem>
                  <ListItem fontSize={18}>
                    - Track all previously attended events
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading
                    fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
                    size="md"
                  >
                    ORGANISERS
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <List spacing={2}>
                  <ListItem fontSize={18}>
                    - Create various amount of events
                  </ListItem>
                  <ListItem fontSize={18}>
                    - To manage each of the events that have been created
                  </ListItem>
                  <ListItem fontSize={18}>
                    - Provide the relevant information of the events
                  </ListItem>
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Stack>

      <Flex
        bg="#323232"
        width="100%"
        minHeight="15vh"
        flexDirection="column"
        justifyContent="center"
        p={4}
      >
        <Text
          fontFamily={"Helvetica Neue Condensed Bold, sans-serif"}
          fontSize={{ base: "md", md: "lg" }}
          fontWeight={"bold"}
          color="white"
          mb={2}
        >
          DATA POLICY
        </Text>

        <Divider orientation="horizontal" borderColor="white" mb={2} />

        <Text
          fontFamily={"Helvetica Neue Light, sans-serif"}
          color="white"
          fontSize={{ base: "xs", md: "sm" }}
        >
          All rights belong to Monash
        </Text>
        <Link
          href="https://tinyurl.com/3k752nvf"
          color="white"
          fontSize={{ base: "sm", md: "md" }}
          textDecoration="none"
          _hover={{ textDecoration: "underline" }}
          isExternal
          fontFamily={"Helvetica Neue Light, sans-serif"}
        >
          Read Our Data Policy
        </Link>
      </Flex>
    </>
  );
};

export default NewLandingPage;
