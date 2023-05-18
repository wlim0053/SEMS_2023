import { Box } from '@chakra-ui/react'
import { Text } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { DeleteIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";
import { Grid } from "@chakra-ui/react";


function GridEventDashboard() {
  return (
<Box mt="20px">
<Grid templateColumns="repeat(6, 1fr)" gap={0.5}>
  <Box w="100%" h="75" bg="#DFE1E4" display = "flex" justifyContent={"center"} pb={"8px"}>
    <Text mt={"auto"} fontWeight={"700"} fontSize={"16px"} fontFamily={"Arial"}>
      Event
    </Text>
  </Box>
  <Box w="100%" h="75" bg="#DFE1E4" display = "flex" justifyContent={"center"} pb={"8px"}>
    <Text mt={"auto"} fontWeight={"700"} fontSize={"16px"} fontFamily={"Arial"}>
      Venue
    </Text>
  </Box>
  <Box w="100%" h="75" bg="#DFE1E4" display = "flex" justifyContent={"center"} pb={"8px"}>
    <Text mt={"auto"} fontWeight={"700"} fontSize={"16px"} fontFamily={"Arial"}>
      Club
    </Text>
  </Box>
  <Box w="100%" h="75" bg="#DFE1E4" display = "flex" justifyContent={"center"} pb={"8px"}>
    <Text mt={"auto"} fontWeight={"700"} fontSize={"16px"} fontFamily={"Arial"} textAlign={'center'}>
      Number of Participants
    </Text>
  </Box>
  <Box w="100%" h="75" bg="#DFE1E4" display = "flex" justifyContent={"center"} pb={"8px"}>
    <Text mt={"auto"} fontWeight={"700"} fontSize={"16px"} fontFamily={"Arial"}>
      Date
    </Text>
  </Box>
  <Box w="100%" h="75" bg="#DFE1E4" display = "flex" justifyContent={"center"} pb={"8px"}>
    <Text mt={"auto"} fontWeight={"700"} fontSize={"16px"} fontFamily={"Arial"}>
      Actions
    </Text>
  </Box>


  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      EXE - IMechE
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      Monash University Malaysia
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      IMechE
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      5/200
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      13th March 2023
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={["center", "space-between"]} alignItems={'center'} pl={"45px"} pr={"45px"}>
    <IconButton
      colorScheme="blue"
      aria-label="View Event"
      icon={<ViewIcon />}
      size={"sm"}
    />

    <IconButton
      colorScheme="blue"
      aria-label="Reorganise Event"
      icon={<RepeatIcon />}
      size={"sm"}
    />

    <IconButton
      colorScheme="blue"
      aria-label="Delete Event"
      icon={<DeleteIcon />}
      size={"sm"}
    />
  </Box>


  <Box w="100%" h="71" bg="#EDEEEE" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      EXE-ICE
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#EDEEEE" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      Monash University Malaysia
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#EDEEEE" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      ICE
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#EDEEEE" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      4/200
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#EDEEEE" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      13th March 2023
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#EDEEEE" display = "flex" justifyContent={["center", "space-between"]} alignItems={'center'} pl={"45px"} pr={"45px"}>
    <IconButton
      colorScheme="blue"
      aria-label="View Event"
      icon={<ViewIcon />}
      size={"sm"}
    />

    <IconButton
      colorScheme="blue"
      aria-label="Reorganise Event"
      icon={<RepeatIcon />}
      size={"sm"}
    />

    <IconButton
      colorScheme="blue"
      aria-label="Delete Event"
      icon={<DeleteIcon />}
      size={"sm"}
    />
  </Box>

  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      EXE - SEM
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      Monash University Malaysia
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      SEM
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      6/200
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={"center"} alignItems={'center'}>
    <Text fontSize={"16px"} fontFamily={"Arial"} textAlign={"center"}>
      13th March 2023
    </Text>
  </Box>
  <Box w="100%" h="71" bg="#FFFFFF" display = "flex" justifyContent={["center", "space-between"]} alignItems={'center'} pl={"45px"} pr={"45px"}>
    <IconButton
      colorScheme="blue"
      aria-label="View Event"
      icon={<ViewIcon />}
      size={"sm"}
    />

    <IconButton
      colorScheme="blue"
      aria-label="Reorganise Event"
      icon={<RepeatIcon />}
      size={"sm"}
    />

    <IconButton
      colorScheme="blue"
      aria-label="Delete Event"
      icon={<DeleteIcon />}
      size={"sm"}
    />
  </Box>
</Grid>
</Box>


  )
}

export default GridEventDashboard


