import { UnorderedList, Box, Text } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import BulletPoint from "./BulletPoint";

function BulletList({ bulletPoints }: { bulletPoints: any[] }) {
  const [showMore, setShowMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const containerHeight = container.clientHeight;
      const lineHeight = parseInt(getComputedStyle(container).lineHeight);
      const maxVisibleLines = 3; // Adjust this value as needed
      const maxVisibleItems = 3; // Adjust this value as needed

      const shouldShowMore = bulletPoints.length > maxVisibleItems || containerHeight > lineHeight * maxVisibleLines;
      setShowMore(shouldShowMore);
    }
  }, [bulletPoints]);

  const maxVisibleItems = 3; // Adjust this value as needed

  return (
    <Box>
      <div ref={containerRef}>
        <UnorderedList listStyleType="none" ml="0" pl="0" textAlign="left">
          {bulletPoints.slice(0, maxVisibleItems).map((bullet, index) => (
            <BulletPoint key={index} bulletDescription={bullet.event} />
          ))}
        </UnorderedList>
      </div>
      {showMore && (
        <Box
          textAlign="left"
          width="80px"
          bg="gray.200"
          display="flex"
          justifyContent="center"
          borderRadius="100px"
          mt="0.5"
        >
          <Text fontSize="12px" display="inline-block">
            And more...
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default BulletList;
