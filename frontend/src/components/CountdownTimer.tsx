import { useEffect, useState } from "react";
import { Box, Card, Text } from "@chakra-ui/react";
import "./TimerStyle.css";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [isMobile, setIsMobile] = useState(false);
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
      start: "2023-04-19T08:00:00",
      end: "2023-04-19T09:00:00",
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
      for (let i = 0; i < events.length; i++) {
        const eventDate = new Date(events[i].start);
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
            endTime: new Date(events[i].end).toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            }),
            title: events[i].title,
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
      <div id="timer">
        <Card className="card countdown-card">
          <Text className="countdown-title">
            There are no future events from {getCurrentDate()} onwards
          </Text>
        </Card>
      </div>
    );
  }

  return (
    <div id="timer">
      <Card className="card countdown-card">
        <Box className="countdown-box">
          <Text className="countdown-title">Next event - {title} is in:</Text>
          <Box className="countdown-container">
            <Box className="countdown-row">
              <Box className="countdown-item">
                <Text className="countdown-value">
                  {Math.floor(timeLeft / (1000 * 60 * 60 * 24))}
                </Text>
                <Text className="countdown-label">Days</Text>
              </Box>
              <Box className="countdown-item">
                <Text className="countdown-value">
                  {Math.floor((timeLeft / (1000 * 60 * 60)) % 24)}
                </Text>
                <Text className="countdown-label">Hours</Text>
              </Box>
              <Box className="countdown-item">
                <Text className="countdown-value">
                  {Math.floor((timeLeft / 1000 / 60) % 60)}
                </Text>
                <Text className="countdown-label">Minutes</Text>
              </Box>
              <Box className="countdown-item">
                <Text className="countdown-value">
                  {Math.floor((timeLeft / 1000) % 60)}
                </Text>
                <Text className="countdown-label">Seconds</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
}

export default CountdownTimer;
