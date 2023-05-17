import { Text } from "@chakra-ui/react"
import {
    ListItem,
  } from '@chakra-ui/react'



function BulletPoint({bulletDescription}) {
  return (
    <ListItem>
        <Text fontSize={"10px"} fontWeight={600}>
          &#8226; {bulletDescription}
        </Text>
    </ListItem>
  )
}

export default BulletPoint