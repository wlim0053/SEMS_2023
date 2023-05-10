import { Heading , Box ,Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,} from "@chakra-ui/react"

const Historypage =  () => {
    return (
        <>
        <Box  h='100px' color='#006DAE'>
            <Heading> Past Events Joined </Heading>
        </Box>

        <TableContainer>
            <Table variant='simple' size='sm'>
            <Thead bg= '#006DAE' height='35'>
                <Tr>
                    <Th color='white' fontSize='lg' pl = '40'>Event No.</Th>
                    <Th color = 'white' fontSize='lg' pr = '40'>Event Name</Th>
                    <Th color = 'white' fontSize='lg' >Date joined</Th>
                </Tr>
            </Thead>

            <Tbody>
                <Tr>
                    <Td fontSize='md' pl = '56'> 1</Td>
                    <Td fontSize='md'> Some events</Td>
                    <Td fontSize='md'> 3/4/2022</Td>
                </Tr>
                <Tr>
                    <Td fontSize='md' pl = '56'> 2</Td>
                    <Td fontSize='md'> Another events</Td>
                    <Td fontSize='md'> 10/7/2022</Td>
                </Tr>
                <Tr>
                    <Td fontSize='md' pl = '56'> 3</Td>
                    <Td fontSize='md'> Some more random events</Td>
                    <Td fontSize='md'> 1/4/2023</Td>
                </Tr>
            </Tbody>

            </Table>
        </TableContainer>
        
        </>
    )
}

export default Historypage