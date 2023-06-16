
import {Image,
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
    Divider
    
}from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons';

function NewLandingPage (){
    
    return(
        <>
        <Flex bgImage= "url('https://www.easyuni.my/media/institution/photo/2015/09/21/a53749f57df20f401babc429f03e613fead283.jpg.600x400_q85.jpg')" 
             bgSize = ' cover' height = '100vh'  bgRepeat= ' no-repeat' opacity='0.9'>
            <Box position = 'relative' left = '17px'>
                <Text color= ' #FFFFFF' fontFamily='Arial' fontWeight='bold'  fontSize = '6xl' pt = '400px'> STUDENT EXPERIENCE MANAGEMENT SYSTEM</Text>
            </Box>

        </Flex>
        <Flex bg='#5A5A5A' height='85vh' position =  'relative' >
            <Box  position='absolute' top = '25%' right = '60%'>
                <Center color = '#FFFFFF' fontWeight = 'bold' fontSize= '4xl' fontFamily='Arial' >About This Page</Center>

            </Box>

            <Flex  >
                <Box  position = 'absolute' top = '45%' right = '52%' border='1px'  borderColor='#5A5A5A' w = '400px' h = '270px' >
                    <Text color = '#FFFFFF' fontWeight = 'bold' fontSize= '1xl' fontFamily='Arial'>This page serves as a starting point for students in School of Information Technology and School of 
                    Engineering to start on thier exciting journey to explore and engage with various events and activities happening around Monash campus
                    </Text>
                    <Spacer height = '3'/>
                    <Text color = '#FFFFFF' fontWeight = 'bold' fontSize= '1xl' fontFamily='Arial'>
                    This page acts as a hub of information, offering students a comprehensive overview of upcoming events, including social gatherings, workshops, club activities, sports competitions, and many more.
                    </Text>
                </Box>

                <Spacer />

                <Box  position = 'absolute' top = '45%' right = '20%' border='1px' borderColor='#5A5A5A' w = '400px' h = '270px'>
                    <Text color = '#FFFFFF' fontWeight = 'bold' fontSize= '1xl' fontFamily='Arial' >
                        Its primary objective is to keep students informed and involved by providing details such as event descriptions, dates, times, locations, and any registration or ticketing requirements. 
                    </Text>
                    <Spacer height = '3'/>
                    <Text color = '#FFFFFF' fontWeight = 'bold' fontSize= '1xl' fontFamily='Arial'>
                        This page alllows students to easily browse through the wide range of options available to them and select events that align with their interests, academic pursuits, or personal development goals.
                    </Text>
                </Box>
                

            </Flex>

        </Flex>

        <Flex bgImage= "url('https://i.ytimg.com/vi/AL__zV0DVdc/maxresdefault.jpg')" 
             bgSize = ' cover' height = '90vh'  bgRepeat= ' no-repeat'position = 'relative'>

                <Flex >
                <Box position = 'absolute' top = '10%' right = '67%' bg = 'white' border='1px' borderColor= '#006DAE' w = '350px' h = '500px' borderWidth=' 5px'>
                <Image height='30vh' src = 'https://www.monash.edu.my/__data/assets/image/0010/1034938/blindfutsal4.jpg'/>
                <Center color = '#006DAE' fontSize='240%' fontWeight='bold'>Exciting Events</Center>
                <Spacer height = '5'/>
                <Text color = '#006DAE' fontSize='130%' position = 'absolute' border='1px' borderColor='white' w = '300px' h = '40px' left = '10%'> Join in on various exiciting events and have fun with other people</Text>
                </Box>

                <Spacer/>

                <Box position = 'absolute' top = '10%' right = '36%' bg = 'white' border='1px' borderColor= '#006DAE' w = '350px' h = '500px' borderWidth=' 5px'>
                <Image height='30vh' src = 'https://www.monash.edu.my/__data/assets/image/0007/912922/home-involved-2020.png'/>
                <Center color = '#006DAE' fontSize='240%' fontWeight='bold'>Socialise</Center>
                <Spacer height = '5'/>
                <Text color = '#006DAE' fontSize='130%' position = 'absolute' border='1px' borderColor='white' w = '300px' h = '40px' left = '7%'> Get to interact with more people that are also studying in Monash</Text>
                </Box>

                <Spacer/>

                <Box
                position = 'absolute' top = '10%' right = '5%' bg = 'white' border='1px' borderColor= '#006DAE' w = '350px' h = '500px' borderWidth=' 5px'>
                <Image height='30vh' src = 'https://www.monash.edu.my/__data/assets/image/0011/3192581/Monash-Information-Technology-Lab.jpg'/>
                <Center color = '#006DAE' fontSize='240%' fontWeight='bold'>Self-Improvement</Center>
                <Spacer height = '5'/>
                <Text color = '#006DAE' fontSize='130%' position = 'absolute' border='1px' borderColor='white' w = '300px' h = '40px' left = '10%'>Get to learn more and improve on your own personal skills</Text>
                </Box>
                </Flex>
        </Flex>

        <Flex  bg='#006DAE' height='85vh' position = 'relative'>
            <Box  position='absolute' top = '23%' right = '60%'>
                <Center color = '#FFFFFF' fontWeight = 'bold' fontSize= '4xl' fontFamily='Arial' > What Can I Do</Center>
            </Box>

            
            <Flex position='absolute' top = '35%' right = '38%' border='1px' borderColor= '#006DAE' w = '550px' h = '200px' borderWidth=' 5px'>
            <Accordion allowToggle>
                <AccordionItem >
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' color = 'white'>
                                Student
                            </Box>
                            <AccordionIcon />
                            </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <List>
                    <ListItem fontSize={18} color = 'white'>- Register for events</ListItem>
                    <ListItem fontSize={18} color = 'white'>- View events that they have signed up for, on a personal calendar</ListItem>
                    <ListItem fontSize={18} color = 'white'>- Search for all events organised by different schools and clubs</ListItem>
                    <ListItem fontSize={18} color = 'white'>- Track all previously attended events</ListItem>
                    </List>
      
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem  >
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' color='white'>
                                Organiser
                            </Box>
                            <AccordionIcon />
                         </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <List alignItems = 'center'>
                            <ListItem fontSize={18} color = 'white'>- Create various amount of events</ListItem>
                            <ListItem fontSize={18} color = 'white'>- To manage each of the events that have been created</ListItem>
                            <ListItem fontSize={18} color = 'white'>- Provide the relevant information of the events</ListItem>
                        </List>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            </Flex>
        </Flex>

        <Flex bgImage= "url('https://thesmartlocal.com/reviews/wp-content/uploads/2012/11/1-1353586223.jpg')" 
             bgSize = 'cover' height = '100vh'  bgRepeat= ' no-repeat'>

            <Flex>
                <Box >
                    <Text color= ' #FFFFFF' fontFamily='Arial' fontWeight='bold'  fontSize = '6xl' mt = '200px' ml = '480px'> Come Join Us Now</Text>
                    <Button colorScheme="blue" mt = {10} ml = '610px' leftIcon={<EmailIcon/>}>
                    Login
                    </Button>

                    <Button colorScheme="blue" mt={10} ml = '100px'>
                    Sign Up
                    </Button>
                </Box>

            </Flex>



        </Flex>


        <Flex bg ='#5A5A5A' height = '8vh' position = 'relative'>
            <Box  color='white' width = 'auto'>
                <Text fontSize={20}>Data Policy</Text>
                <Divider orientation='horizontal' />
                <Text fontSize={15}>
                    All rights belong to Monash
                </Text>
            </Box>
                
        </Flex>
    

        </>
    );
}

export default NewLandingPage