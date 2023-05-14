import { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [, setEventDate] = useState("");
  const [, setStartTime] = useState("");
  const [, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [, setIsMobile] = useState(false);
  const [futureEvent, setFutureEvent] = useState(true);

  const events = [
    {
      title: "MUM Event",
      start: "2023-04-05T08:00:00",
      end: "2023-04-05T09:00:00",
      description: "This is a MUM event",
    },
    {
      title: "MUM Event 2",
      start: "2023-05-02T12:24:00",
      end: "2023-05-02T13:00:00",
      description: "This is a MUM event",
    },
    {
      title: "MUM Event 3",
      start: "2023-05-16T12:26:00",
      end: "2023-05-16T13:00:00",
      description: "This is a MUM event",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 845);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      let nearestEvent = null;
      for (const element of events) {
        const eventDate = new Date(element.start);
        const timeLeft = eventDate.getTime() - currentDate.getTime();
        if (
          timeLeft > 0 &&
          (!nearestEvent || timeLeft < nearestEvent.timeLeft)
        ) {
          nearestEvent = {
            timeLeft,
            eventDate,
            startTime: eventDate.toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            }),
            endTime: new Date(element.end).toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            }),
            title: element.title,
          };
        }
      }
      if (nearestEvent) {
        setTimeLeft(nearestEvent.timeLeft);
        setEventDate(nearestEvent.eventDate.toLocaleDateString());
        setStartTime(nearestEvent.startTime);
        setEndTime(nearestEvent.endTime);
        setTitle(nearestEvent.title);
      } else {
        setFutureEvent(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // get current date of today in "DD(th/st/nd/rd) MMM YYYY" format
  function getCurrentDate() {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    } as const;
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const date = new Date();
    return formatter.format(date);
  }

  if (!futureEvent) {
    return (
      <Flex
        id="timer"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={{ base: "1.5rem", md: "2rem" }}
      >
        <Box
          className="card countdown-card"
          maxW={{ base: "calc(100% - 4rem)", md: "30rem" }}
          borderWidth="1px"
          borderColor="#006dac"
          borderRadius="0.5rem"
          boxShadow="0 0 0.5rem 0.1rem #006dac"
          p={{ base: "0.1rem", md: "1.5rem" }}
          m="0 auto"
          mt={{ base: "0.1rem", md: "1rem" }}
          mb={{ base: "0.1rem", md: "1.5rem" }}
        >
          <Text
            className="countdown-title"
            fontFamily="Helvetica Neue, Arial Narrow, sans-serif"
            fontWeight="bold"
            fontSize={{ base: "1.2rem", md: "1.5rem" }}
            textAlign="center"
          >
            There are no future events from {getCurrentDate()} onwards
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      id="timer"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={{ base: "1.5rem", md: "2rem" }}
    >
      <Box
        className="card countdown-card"
        maxW={{ base: "calc(100% - 4rem)", md: "30rem" }}
        borderWidth="1px"
        borderColor="#006dac"
        borderRadius="0.5rem"
        boxShadow="0 0 0.5rem 0.1rem #006dac"
        p={{ base: "0.1rem", md: "1.5rem" }}
        m="0 auto"
        mt={{ base: "0.1rem", md: "1rem" }}
        mb={{ base: "0.1rem", md: "1.5rem" }}
      >
        <Box className="countdown-box" p="1.5rem">
          <Text
            className="countdown-title"
            fontFamily="Helvetica Neue, Arial Narrow, sans-serif"
            fontWeight="bold"
            fontSize={{ base: "1.2rem", md: "1.5rem" }}
            textAlign="center"
          >
            Next event - {title} is in:
          </Text>
          <Flex
            className="countdown-container"
            mt="1.5rem"
            justifyContent="center"
          >
            {[
              {
                label: "Days",
                value: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
              },
              {
                label: "Hours",
                value: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
              },
              {
                label: "Minutes",
                value: Math.floor((timeLeft / 1000 / 60) % 60),
              },
              { label: "Seconds", value: Math.floor((timeLeft / 1000) % 60) },
            ].map((item, index) => (
              <Flex
                key=""
                className="countdown-item"
                textAlign="center"
                flex="1"
                mr={index < 3 ? "1rem" : "0"}
              >
                <Box>
                  <Text
                    className="countdown-value"
                    fontFamily="Helvetica Neue, Arial Narrow, sans-serif"
                    fontSize={{ base: "2.25rem", md: "3rem" }}
                    fontWeight="bold"
                  >
                    {item.value}
                  </Text>
                  <Text
                    className="countdown-label"
                    fontFamily="Helvetica Neue, Arial Narrow, sans-serif"
                    fontSize="1rem"
                  >
                    {item.label}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default CountdownTimer;