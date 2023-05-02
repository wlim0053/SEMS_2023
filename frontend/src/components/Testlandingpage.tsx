import { Container, Heading, List,ListItem, Divider,Box, Center, Image,HStack, VStack, Text } from '@chakra-ui/react'



const Testlandingpage = () =>{
    return(
        <>
        <Center bg='#006DAE' h='100px' color='white'>
            <Heading  as='h3' size='lg'>STUDENT EXPERIENCE MANAGEMENT SYSTEM</Heading>
        </Center>


        <Box mt={5}>
            <Center>
                <Box  alignItems = 'centre' >
                    <Image sizes='sm'  src='https://www.monash.edu/__data/assets/image/0010/1795816/group-of-students-has-picnic-lunch-in-the-park-2015.JPG' alt='Dan Abramov' />
                </Box>
            </Center>

            <Center>
                <Box mt={5}> 
                    <Heading>How Does Student Management Experience System Work?</Heading>
                </Box>
            </Center>
        </Box>

        <HStack spacing='50px' mt={50} mb= {50}>

            <Box ml={50} border='1px' borderColor='#006DAE' w = '655px' h = '270px' borderWidth={5}  >
                <Center>
                    <Text fontSize={40} fontWeight = 'bold'>
                        Student
                    </Text>
                </Center>
                <List>
                    <ListItem fontSize={18}>- Register for events</ListItem>
                    <ListItem fontSize={18}>- View events that they have signed up for, on a personal calendar</ListItem>
                    <ListItem fontSize={18}>- Search for all events organised by different schools and clubs</ListItem>
                    <ListItem fontSize={18}>- Track all previously attended events</ListItem>
                </List>

            </Box>

            <Box border='1px'  borderColor='#006DAE' w = '655px' h = '270px' borderWidth={5}  >
                <Center>
                   <Text fontSize={40} fontWeight = 'bold'>
                    Organiser
                   </Text>
                </Center>               
                <List alignItems = 'center'>
                    <ListItem fontSize={18}>- Create events</ListItem>
                    <ListItem fontSize={18}>- Manage the events created</ListItem>

                </List>
            </Box>

        </HStack>

        <Container as='footer' >
            <VStack>
                <Box bg='#5A5A5A' w='254%' p={4} color='white'>
                    <Text fontSize={20}>Data Policy</Text>
                    <Divider orientation='horizontal' />
                    <Text fontSize={15}>
                        All rights belong to Monash
                    </Text>
                </Box>
                
            </VStack>
        </Container>

        </>
    )
}

export default Testlandingpage