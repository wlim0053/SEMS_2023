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
    Image
} from "@chakra-ui/react"


const Testing = () => { 

    return(
    <>
        <Flex position='relative' overflow='auto'>
            <Box height='100vh' bg = '#027EB6' width='75vh' position='relative'  opacity='0.8' alignItems='center' >
                <Heading position='absolute'  fontWeight='bold' bottom = '40vh' fontSize='60px' color='white' left = '30px'>
                    STUDENT MANAGEMENT EXPERIENCE SYSTEM
                </Heading> 
            </Box>

            <Box bgSize = ' cover' height = '100vh'  position = 'relative'>
                <Image height = '100vh' bgRepeat= ' no-repeat'  right = '0px' src = 'https://www.easyuni.my/media/institution/photo/2015/09/21/a53749f57df20f401babc429f03e613fead283.jpg.600x400_q85.jpg'>

                </Image>
            </Box>
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
        
        
        
    </>
        
        

        

    )

 }

export default Testing