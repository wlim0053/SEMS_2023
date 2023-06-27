import { 
    Square,
    Box,
    Text,
    Heading,
    Center,
    Flex,
    Spacer,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    List,
    ListItem,
    Button,
    Container,
    VStack,
    Divider,
    ButtonGroup,
    Image,
    Card,
    CardHeader, 
    CardBody, 
    CardFooter,
    Stack,
    StackDivider

} from "@chakra-ui/react"
import { EmailIcon } from '@chakra-ui/icons';


const Testing = () => { 

    return(
    <>
        <Flex position='relative' overflow='auto'>
            

            <Box bgSize = ' cover' height = '100vh'  position = 'relative'>
                <Image height = '100vh' bgRepeat= ' no-repeat'  right = '0px' src = 'https://www.easyuni.my/media/institution/photo/2015/09/21/a53749f57df20f401babc429f03e613fead283.jpg.600x400_q85.jpg'>

                </Image>
            </Box>

            <Flex height='100vh' bg = '#027EB6' width='75vh' position='relative'  alignItems='center' justifyContent='center' alignContent='center' flexDirection = 'column' >
                <Heading position='absolute'  fontWeight='bold' bottom = '40vh' fontSize='60px' color='white' left = '30px'>
                    STUDENT MANAGEMENT EXPERIENCE SYSTEM
                </Heading> 
                <ButtonGroup gap = '10' position = 'relative' top = '180px'>
                    
                    <Button colorScheme="gray" leftIcon={<EmailIcon/>}>
                    Login
                    </Button>

                    <Button colorScheme="gray" leftIcon={<EmailIcon/>} >
                    Sign Up
                    </Button>
                </ButtonGroup>
            </Flex>
        </Flex>

        <Flex position = 'relative' height = '100vh' flexWrap='wrap' justifyContent= 'center'>


        
        <Box   w = '400px'>
            <Heading position = 'relative' top = '150px' fontWeight='bold' color = 'black'> About This Page </Heading>
            <Text position = 'relative' top = '170px' lineHeight='25px'> This page serves as a starting point for students in School of Information Technology and School of 
                    Engineering to start on thier exciting journey to explore and engage with various events and activities happening around Monash campus
            </Text>
            <Text position = 'relative' top = '190px' lineHeight='25px'> This page acts as a hub of information, offering students a comprehensive overview of upcoming events, including social gatherings, workshops, club activities, sports competitions, and many more.
            </Text>
        </Box>


        <Box>
            <Image position = 'relative' src = 'https://www.easyuni.my/media/institution/photo/2015/09/21/a53749f57df20f401babc429f03e613fead283.jpg.600x400_q85.jpg'
            objectFit='contain'  left = '50px' top = '70px'></Image>
        </Box>

        <Box  position='relative' w = '125vh'>
            <Text position = 'relative' lineHeight='25px'>
            Its primary objective is to keep students informed and involved by providing details such as event descriptions, dates, times, locations, and any registration or ticketing requirements. 
            </Text>
            <Text position = 'relative' lineHeight='25px'>
            This page allows students to easily browse through the wide range of options available to them and select events that align with their interests, academic pursuits, or personal development goals.
            </Text>

        </Box>

        </Flex>

        
        <Flex position='relative' height='100vh' bg = '#E6E6E6' justifyContent='space-around' flexWrap='wrap'>

            <Heading position = 'absolute' fontWeight='bold'>So Why Join In On Events?</Heading>
           
            <Card maxW='sm' height='80vh' position='relative' top = '65px' left = '50px'>
                <CardBody>
                    <Image
                    src='https://www.monash.edu.my/__data/assets/image/0010/1034938/blindfutsal4.jpg'
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>Tons of Exciting Events</Heading>
                        <Text>
                        Join in on various exiciting events to have fun with other people, enjoy time in campus and pursue your own passion,
                        which can make your overall school experience much more enjoyable and fulfilling.

                        </Text>
                    </Stack>
                </CardBody>
            </Card>

            <Spacer/>

            <Card maxW='sm' height='80vh' position='relative' top = '65px' >
                <CardBody>
                    <Image
                    src='https://www.monash.edu.my/__data/assets/image/0007/912922/home-involved-2020.png'
                    
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>Socialise</Heading>
                        <Text>
                        Get to connect and interact with your peers who may share a similar interest as you. Also to form new friendships,
                        developing your own social skills as well as creating a sense of belonging within the school community.
                        </Text>
                    </Stack>
                </CardBody>
            </Card>

            <Spacer/>

            <Card maxW='sm' height='80vh' position='relative' top = '65px' right = '50px'>
                <CardBody>
                    <Image
                    src='https://www.monash.edu.my/__data/assets/image/0011/3192581/Monash-Information-Technology-Lab.jpg'
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>Self-Improvement</Heading>
                        <Text>
                         Acts as an opportunity for students to further develop and enhance a wide range of skills,
                         regardless of the type of activities. Students will gte to improve their soft skills such as teamwork, 
                         leadership,communication, problem-solving, time management, and organizational skills.
                        </Text>
                    </Stack>
                </CardBody>
            </Card>
        </Flex>

        <Flex position='relative' overflow='auto'>
            <Box height='100vh' bg = '#027EB6' width='75vh' position='relative'   alignItems='center' >
                <Heading position='absolute'  fontWeight='bold' bottom = '40vh' fontSize='60px' color='white' left = '30px'>
                    SO WHAT CAN YOU DO ON THIS PAGE?
                </Heading> 
            </Box>

            <Flex  height = '100vh' width = '100%' position = 'relative'  bg = 'white' alignItems='center'>
                <Card position = 'relative' height = '50vh'>
                    <CardHeader>
                        <Heading size='md'>Students</Heading>
                    </CardHeader>
                    <CardBody>
                        <List>
                        <ListItem fontSize={18} >- Register for events</ListItem>
                        <ListItem fontSize={18} >- View events that they have signed up for, on a personal calendar</ListItem>
                        <ListItem fontSize={18} >- Search for all events organised by different schools and clubs</ListItem>
                        <ListItem fontSize={18} >- Track all previously attended events</ListItem>
                        </List>
                    </CardBody>
                </Card>

                <Spacer/>

                <Card position = 'relative' height = '50vh'>
                    <CardHeader>
                        <Heading size='md'>Organisers</Heading>
                    </CardHeader>
                    <CardBody>
                        <List>
                        <ListItem fontSize={18} >- Create various amount of events</ListItem>
                        <ListItem fontSize={18} >- To manage each of the events that have been created</ListItem>
                        <ListItem fontSize={18} >- Provide the relevant information of the events</ListItem>
                        </List>
                    </CardBody>
                </Card>
                

            </Flex>

        </Flex>

        <Flex position = 'relative' bgImage= "url('https://www.monash.edu.my/__data/assets/image/0003/988023/Malaysia-campus-2-.jpg')" 
             bgSize = 'cover' height = '100vh'  justifyContent='center' alignContent='center' alignItems='center' flexDirection = 'column' >
                <Center position='relative' bottom = '70px' color= ' #027EB6' fontFamily='Arial' fontWeight='bold'  fontSize = '6xl'> Come Join Us Now</Center>
                <ButtonGroup gap = '10'>
                    
                    <Button colorScheme="blue" leftIcon={<EmailIcon/>}>
                    Login
                    </Button>

                    <Button colorScheme="blue" leftIcon={<EmailIcon/>} >
                    Sign Up
                    </Button>
                </ButtonGroup>
        </Flex>


        <Flex bg = '#5A5A5A' width = '100%' height='15vh' flexDirection='column' justifyContent='center'>
            <Text fontSize='2xl' color = 'white'> Data Policy</Text>

            <Divider orientation="horizontal"/>
            <Text color = 'white' fontSize='m'> All rights belong to Monash</Text>


        </Flex>
 
    </>
        
        

        

    )

 }

export default Testing