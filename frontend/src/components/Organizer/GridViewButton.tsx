import React from 'react'
import { IconButton } from "@chakra-ui/react"
import CustomGridIcon from './CustomGridIcon';

function GridViewButton({calendarViewFlag, toggleView}) {
    const originalBgColour = "blue";
    const originalIconColour = "white";
    const toggledBgColour = "white"
    const toggledIconColour = "black"  

  return (
    <IconButton
        colorScheme = {!calendarViewFlag ? toggledBgColour : originalBgColour}
        aria-label="Grid View"
        icon={<CustomGridIcon color={!calendarViewFlag ? toggledIconColour : originalIconColour}/>}
        onClick={toggleView}
    />
  )
}

export default GridViewButton