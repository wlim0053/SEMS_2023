import React from 'react'
import { IconButton } from "@chakra-ui/react"
import { CalendarIcon } from "@chakra-ui/icons";

function CalendarViewButton({calendarViewFlag, toggleView}) {


    const originalBgColour = "blue";
    const originalIconColour = "white";
    const toggledBgColour = "white"
    const toggledIconColour = "black"
      
  return (
    <IconButton
        colorScheme = {calendarViewFlag ? toggledBgColour : originalBgColour}
        aria-label="Calendar View"
        icon={<CalendarIcon color={calendarViewFlag ? toggledIconColour : originalIconColour}/>}
        onClick={toggleView}
    />
  )
}

export default CalendarViewButton