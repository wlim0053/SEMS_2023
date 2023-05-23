import { Text, ListItem } from "@chakra-ui/react"

interface BulletPointProps {
  bulletDescription: string;
}

const BulletPoint: React.FC<BulletPointProps> = ({ bulletDescription }) => {
  return (
    <ListItem>
        <Text fontSize={"10px"} fontWeight={600}>
          &#8226; {bulletDescription}
        </Text>
    </ListItem>
  )
}

export default BulletPoint;
