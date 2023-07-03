import { IconButton } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

interface CalendarViewButtonProps {
  calendarViewFlag: boolean;
  toggleView: () => void;
}

function CalendarViewButton({ calendarViewFlag, toggleView }: CalendarViewButtonProps) {
  const originalBgColour = "blue";
  const originalIconColour = "white";
  const toggledBgColour = "white";
  const toggledIconColour = "black";

  return (
    <IconButton
      color={calendarViewFlag ? toggledBgColour : originalBgColour}
      aria-label="Calendar View"
      icon={<CalendarIcon color={calendarViewFlag ? toggledIconColour : originalIconColour} />}
      onClick={toggleView}
    />
  );
}

export default CalendarViewButton;
