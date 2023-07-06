import React from 'react';
import { IconButton } from "@chakra-ui/react";
import CustomGridIcon from './CustomGridIcon';

interface GridViewButtonProps {
  calendarViewFlag: boolean;
  toggleView: () => void;
}

const GridViewButton: React.FC<GridViewButtonProps> = ({ calendarViewFlag, toggleView }) => {
  const originalBgColour = "blue";
  const originalIconColour = "white";
  const toggledBgColour = "white";
  const toggledIconColour = "black";

  return (
    <IconButton
      colorScheme={!calendarViewFlag ? originalBgColour : toggledBgColour}
      aria-label="Grid View"
      icon={<CustomGridIcon color={!calendarViewFlag ? originalIconColour : toggledIconColour} />}
      onClick={toggleView}
    />
  );
}

export default GridViewButton;
