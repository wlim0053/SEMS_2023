import BulletPoint from './BulletPoint'
import {
    UnorderedList,
    Box,
    Text
  } from '@chakra-ui/react'
import React from 'react'

function BulletList({bulletPoints}: { bulletPoints: any }) {
  return (
    <Box>
      <UnorderedList listStyleType="none" ml="0" pl="0" textAlign={"left"}>
        {bulletPoints.map((bullet : any, index : any) => (
          <BulletPoint key={index} bulletDescription={bullet.event} />
        ))}
      </UnorderedList>
      <Box textAlign="left" width={"80px"}  bg="gray.200" display={"flex"} justifyContent={"Center"} borderRadius={"100px"}>
        <Text fontSize="12px" display="inline-block">
          And more...
        </Text>
      </Box>

      
    </Box>
  )
}

export default BulletList

