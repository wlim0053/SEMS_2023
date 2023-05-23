import { Button, ButtonGroup } from "@chakra-ui/react"
import { Box, IconButton } from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons";
function GridEventDashboardPageNavigator() {
  return (
<Box display={"flex"} justifyContent={'center'} mt={"50px"}>
<ButtonGroup size="sm" isAttached variant="outline">
<Button >1</Button>
<Button >2</Button>
<IconButton aria-label="Next Page" icon={<ChevronRightIcon />} />
</ButtonGroup>
</Box>
  )
}

export default GridEventDashboardPageNavigator